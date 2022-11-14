import { GetServerSideProps } from 'next';
import { IPost } from '@/interfaces/models/IPost';
import { postAPI } from '@/modules/Posts/api';
import PostListModule from '@/modules/Posts/pages/AllPosts';
import type { NextPage } from 'next';
import { Author } from '@/modules/SugesstionRecipe/api';
import { TOffset } from '@/types';

type Props = {
  posts: IPost[];
  pagination: TOffset;
};
const Home: NextPage = (props: Props) => {
  const { posts, pagination } = props;
  return <>{<PostListModule posts={posts} pagination={pagination} />}</>;
};

export default Home;

export const rawToIPost = (data: {
  id: number;
  content: string;
  title: string;
  is_receipe: boolean;
  created_at: '2022-11-01T23:54:13.000Z';
  updated_at: '2022-11-01T23:54:15.000Z';
  cook_time: number;
  author: Author;
  tags: {
    id: number;
    name: string;
    is_required: boolean;
    questions: {
      id: number;
      content: string;
    }[];
  }[];
  upvote: number;
  downvote: number;
}): IPost => {
  return {
    id: data.id,
    isReceipe: data.is_receipe,
    author: data.author,
    cookTime: data.cook_time,
    createdAt: data.created_at,
    downvote: data.downvote,
    tags: data.tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      isRequired: tag.is_required,
      questions: tag.questions,
    })),
    title: data.title,
    upvote: data.upvote,
    updatedAt: data.updated_at,
    content: data.content,
  };
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const {
      data: { posts, pagination },
    } = await postAPI.getUserPosts({ isSSR: true });
    return {
      props: {
        posts: posts.map((item) => rawToIPost(item)),
        // posts: [],
        pagination,
      },
    };
  } catch (error) {
    return {
      props: {
        posts: [],
      },
    };
  }
};
