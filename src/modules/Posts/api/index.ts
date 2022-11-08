import { Author, Tag } from '@/modules/SugesstionRecipe/api';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL;
export type CreatePostPayload = {
  title: string;
  content: string;
  isReceipe: boolean;
  tagIds: number[];
  cookTime: number;
};
export interface ResponsePost {
  id: number;
  content: string;
  title: string;
  is_receipe: boolean;
  created_at: Date;
  updated_at: Date;
  cook_time: number;
  author: Author;
  tags: Tag[];
  upvote: number;
  downvote: number;
}

class PostAPI {
  async getPostById(id: number) {
    const res = await axios.get(`${baseUrl}/post-by-id?id=${id}`);
    return res.data;
  }

  async getPosts() {
    const res = await axios.get(`${baseUrl}/posts`);
    return res.data;
  }
  async createPosts(params: CreatePostPayload) {
    const res = await axios.post(`${baseUrl}/posts`, params);
    return res.data;
  }
  async updatePosts(id: number, params: CreatePostPayload) {
    const res = await axios.post(`${baseUrl}/posts/${id}`, params);
    return res.data;
  }
}
export const postAPI = new PostAPI();
