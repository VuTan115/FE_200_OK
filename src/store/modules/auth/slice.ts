import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/interfaces/models/IUser';
import { IAuthState } from './types';

const initialState: IAuthState = {
  isAuthenticated: false,
  me: {} as IUser,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    checkAuth(state, action) {
      const { isAuthenticated } = action.payload;
      return {
        ...state,
        isAuthenticated,
      };
    },
    // logoutAuth(state, action) {
    //   return {
    //     ...state,
    //     isAuthenticated: false,
    //     me: {},
    //   };
    // },
    setAuthUser(state, action) {
      return {
        ...state,
        me: action.payload,
      };
    },
    setUserFieldValue(state, action: { payload: IUser }) {
      return {
        ...state,
        me: {
          ...state.me,
          ...action.payload,
        },
      };
    },
  },
});

export const {
  checkAuth,
  // logoutAuth,
  setAuthUser,
  setUserFieldValue,
} = slice.actions;

export default slice.reducer;
