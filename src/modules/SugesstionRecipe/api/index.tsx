import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL;
export interface ResponseQuestion {
  id: number;
  content: string;
  tags: {
    id: number;
    name: string;
    is_required: boolean;
  }[];
}

export interface ResponseSuggestion {
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

export interface Author {
  id: number;
  name: string;
  age: number;
}

export interface Tag {
  id: number;
  name: string;
  isRequired: boolean;
}
export interface getQuestionRespose {
  id: number;
  content: string;
  tags: {
    id: number;
    name: string;
    is_required: boolean;
    questions: {
      id: number;
      content: string;
    }[];
  }[];
}
class QuestionAPI {
  async getQuestions(number?: number) {
    const res = await axios.get(
      `${baseUrl}/random-questions?${number ? `number=${number}` : ''}`
    );
    return res.data;
  }

  async getSuggestionFromTags(tags: number[]) {
    // convert json tags to query string
    const query = tags ? tags.map((tag) => `tags[]=${tag}`).join('&') : undefined;
    const res = await axios.get(`${baseUrl}/suggestion-posts?${query}`);
    return res.data;
  }
}
export const questionAPI = new QuestionAPI();
