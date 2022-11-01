import { IPost } from '@/interfaces/models/IPost';
import React from 'react';

type Props = {
  data?: any;
};
const mockData: IPost[] = [
  {
    id: 1,
    title: 'Title 1',
    content: 'Content 1',
    author: {
      id: 1,
      name: 'Trịnh Ngọc Tâm',
      avatar: 'https://joeschmoe.io/api/v1/random',
    },
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
    tags: ['tag 1', 'tag2'],
    isReceipe: true,
  },
];
const PostsPage = (props: Props) => {
  return <div>PostsPage</div>;
};

export default PostsPage;
