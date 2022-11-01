import { IUser } from './IUser';

export interface IPost {
  id: number;
  title: string;
  content: string;
  isReceipe: boolean;
  author: IUser;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
