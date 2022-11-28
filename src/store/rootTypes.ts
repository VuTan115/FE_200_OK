import { IAuthState } from './modules/auth/types';
import { IBookmarkState } from './modules/bookmark/types';

export interface IRootState {
  auth: IAuthState;
  bookmark: IBookmarkState;
}
