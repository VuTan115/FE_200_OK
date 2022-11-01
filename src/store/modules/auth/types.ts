import { IUser } from '@/interfaces/models/IUser';

export interface IAuthState {
  isAuthenticated: boolean;
  me: IUser;
}
