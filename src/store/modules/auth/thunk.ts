import { checkAuth } from './slice';

export function asyncProcessAuth(): any {
  return (dispatch) => {
    dispatch(checkAuth({ isAuthenticated: true }));
  };
}

export function asyncLogoutAuth(): any {
  return (dispatch) => {
    // logout();
    setTimeout(() => {
      window.location.href = '/';
    }, 200);
  };
}
