import { combineReducers } from 'redux';

import authReducer from './modules/auth/slice';
import bookmarkReducer from './modules/bookmark/slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  bookmark: bookmarkReducer,
});
