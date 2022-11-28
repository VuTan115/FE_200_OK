import { Author, Tag } from '@/modules/SugesstionRecipe/api';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL;
const privateUrl = process.env.NEXT_PRIVATE_APP_API_URL ?? baseUrl;
const defaultLimit = 10;
const defaultOffset = 0;

export type CreatePostPayload = {
  title: string;
  content: string;
  isReceipe: boolean;
  tagIds: number[];
  cookTime: number;
  thumbnail: string;
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
export type BookmarkPostParams = {
  post_id: number;
};
class PostAPI {
  async getPostById(id: number, options?: { isSSR?: boolean }) {
    const res = await axios.get(
      `${options?.isSSR ? privateUrl : baseUrl}/post-by-id?id=${id}`
    );
    return res.data;
  }

  async getPosts(options?: { isSSR?: boolean; offset?: number; limit?: number }) {
    const res = await axios.get(
      `${options?.isSSR ? privateUrl : baseUrl}/posts?limit=${
        options.limit ?? defaultLimit
      }&offset=${options.offset ?? defaultOffset}`
    );
    return res.data;
  }

  async getAllBookmarkedPosts(options?: {
    isSSR?: boolean;
    offset?: number;
    limit?: number;
  }) {
    const res = await axios.get(
      `${options?.isSSR ? privateUrl : baseUrl}/posts/bookmark?limit=${
        options.limit ?? defaultLimit
      }&offset=${options.offset ?? defaultOffset}`
    );
    return res.data;
  }

  async getBookmarkedPosts(
    userId: string | number,
    options?: { isSSR?: boolean; offset?: number; limit?: number }
  ) {
    const res = await axios.get(
      `${options?.isSSR ? privateUrl : baseUrl}/users/${userId}/bookmarks`
    );
    return res.data;
  }

  async getUserPosts(options?: { isSSR?: boolean; offset?: number; limit?: number }) {
    const res = await axios.get(
      `${options?.isSSR ? privateUrl : baseUrl}/posts/me?limit=${
        options.limit ?? defaultLimit
      }&offset=${options.offset ?? defaultOffset}`
    );
    return res.data;
  }
  async createPosts(params: CreatePostPayload) {
    const res = await axios.post(`${baseUrl}/posts`, params);
    return res.data;
  }
  async updatePosts(id: number, params: CreatePostPayload) {
    const res = await axios.put(`${baseUrl}/posts/${id}`, params);
    return res.data;
  }
  async bookmarkPosts(params: BookmarkPostParams, userId: string) {
    const res = await axios.post(`${baseUrl}/users/2/bookmarks`, params);
    return res.data;
  }
  async unbookmarkPosts(params: BookmarkPostParams, userId: string) {
    const res = await axios.delete(`${baseUrl}/users/2/bookmarks`, {
      data: params,
    });
    return res.data;
  }
}
export const postAPI = new PostAPI();
export * from './upload';
