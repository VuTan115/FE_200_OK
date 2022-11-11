import { Tag } from '@/modules/SugesstionRecipe/api';
import { IUser } from './IUser';

export interface IPost {
  id: number;
  title: string;
  content: string;
  isReceipe: boolean;
  author: IUser;
  cookTime: number;
  upvote: number;
  downvote: number;
  tags: Tag[];
  questions?: {
    id: number;
    content: string;
    tags: {
      id: number;
      name: string;
      is_required: boolean;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
}
