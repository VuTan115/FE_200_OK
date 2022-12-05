import { combineReducers } from 'redux';

import authReducer from './modules/auth/slice';
import bookmarkReducer from './modules/bookmark/slice';
import votingReducer from './modules/voting/slice';

export const rootReducer = combineReducers({
  auth: authReducer,
  bookmark: bookmarkReducer,
  voting: votingReducer,
});
