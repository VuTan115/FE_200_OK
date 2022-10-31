import { IUser } from './IUser';

export interface IPost {
  id: number;
  title: string;
  content: string;
  isReceipe: boolean;
  author: IUser;
  tags: Array<string>;
  createdAt: string;
  updatedAt: string;
}
