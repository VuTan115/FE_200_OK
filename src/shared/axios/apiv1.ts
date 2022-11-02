import axios, { AxiosError, AxiosInstance } from 'axios';
import { Cookies } from '.';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error: AxiosError, token = null) => {
  failedQueue.forEach((item) => {
    if (error) {
      item.reject(error);
    } else {
      item.resolve(token);
    }
  });

  failedQueue = [];
};

function rejectErrorAndClearToken(error: AxiosError) {
  Cookies.deleteAuthCookie();
  window.location.href = '/';

  return Promise.reject(error);
}

const cancelTokenSource = axios.CancelToken.source();

const apiVer1: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/json',
  },
  cancelToken: cancelTokenSource.token,
});

apiVer1.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiVer1.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Only handle when status == 401
    if (error?.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Clear token and throw error when retried
    if (originalRequest._retry) {
      return rejectErrorAndClearToken(error);
    }

    // If refresh token is not valid and server response status == 401
    if (originalRequest.url === 'auth/refresh-token') {
      return rejectErrorAndClearToken(error);
    }

    // Handle if token is refreshing
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          return apiVer1(originalRequest);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    }

    // Set variables
    originalRequest._retry = true;
    isRefreshing = true;
  }
);

export { apiVer1 };
