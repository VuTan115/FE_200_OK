import { GetServerSideProps } from 'next';
import { IPost } from '@/interfaces/models/IPost';
import { postAPI } from '@/modules/Posts/api';
import PostListModule from '@/modules/Posts/pages/AllPosts';
import type { NextPage } from 'next';
import { Author } from '@/modules/SugesstionRecipe/api';
import { TOffset } from '@/types';
import Link from 'next/link';
import { Button } from 'antd';
import { useRouter } from 'next/router';
import { CaretDownOutlined } from '@ant-design/icons';

type Props = {
  lastestPost: IPost[];
  bookmarkedPost: IPost[];
  pagination: TOffset;
};
const Home: NextPage = (props: Props) => {
  const { lastestPost, bookmarkedPost, pagination } = props;
  const router = useRouter();
  return (
    <div>
      <h1 className="text-center text-[40px] font-bold">Hôm nay ăn gì nhỉ?</h1>
      <div className="flex justify-center my-4">
        <Button type="primary" size="large" onClick={() => router.push('/goi-y')}>
          Bắt đầu
        </Button>
      </div>

      <div className="flex justify-center items-center text-[24px]">
        <CaretDownOutlined />
        Khám phá món ăn
        <CaretDownOutlined />
      </div>

      <div className="flex flex-col">
        <Link href="/bai-dang-moi-nhat">
          <h2 className="text-[28px] my-4">Bài viết mới nhất </h2>
        </Link>
        <PostListModule posts={lastestPost} />

        <Link href="/bai-da-luu">
          <h2 className="text-[28px] my-4">Bài viết đã lưu </h2>
        </Link>
        <PostListModule posts={bookmarkedPost} />
      </div>
    </div>
  );
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
  thumbnail: string;
  questions?: {
    id: number;
    content: string;
    tags: {
      id: number;
      name: string;
      is_required: boolean;
    }[];
  }[];
}) => {
  return {
    id: data.id,
    isReceipe: data.is_receipe,
    author: data?.author,
    cookTime: data.cook_time,
    createdAt: data.created_at,
    downvote: data.downvote,
    tags:
      data.tags &&
      data.tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
        isRequired: tag.is_required,
        questions: tag.questions,
      })),
    title: data.title,
    upvote: data.upvote,
    updatedAt: data.updated_at,
    content: data.content,
    questions: data.questions || [],
    thumbnail: data.thumbnail,
  };
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const [res1, res2] = await Promise.allSettled([
      postAPI.getPosts({ isSSR: true, limit: 4 }),
      postAPI.getAllBookmarkedPosts({ isSSR: true, limit: 4 }),
    ]);
    let bookmarkedPost = [];
    let lastestPost = [];
    if (res1.status === 'fulfilled') {
      const {
        data: { posts },
      } = res1.value;
      lastestPost = posts.slice(0, 4);
    }
    if (res2.status === 'fulfilled') {
      const {
        data: { posts },
      } = res2.value;
      bookmarkedPost = posts.slice(0, 4);
    }

    return {
      props: {
        bookmarkedPost,
        lastestPost,
      },
    };
  } catch (error) {
    return {
      props: {
        bookmarkedPost: [],
        lastestPost: [],
      },
    };
  }
};
