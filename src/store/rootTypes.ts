import { IAuthState } from './modules/auth/types';
import { IBookmarkState } from './modules/bookmark/types';
import { IVotingState } from './modules/voting/types';

export interface IRootState {
  auth: IAuthState;
  bookmark: IBookmarkState;
  voting: IVotingState;
}
