import { IPost } from '@/interfaces/models/IPost';
import { postAPI } from '@/modules/Posts/api';
import LastesPostListModule from '@/modules/Posts/pages/LastestPosts';
import { TOffset } from '@/types';
import { GetServerSideProps } from 'next';
import { rawToIPost } from '..';
import PostListModule from '@/modules/Posts/pages/AllPosts';

type Props = {
  pagination: TOffset;
  posts: IPost[];
};

const LastestPostsPage = (props: Props) => {
  const { posts, pagination } = props;
  return (
    <>
      <PostListModule posts={posts} pagination={pagination} />
    </>
  );
};

export default LastestPostsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const {
      data: { posts, pagination },
    } = await postAPI.getPosts({ isSSR: true });
    return {
      // props: { posts: posts.map((item) => rawToIPost(item)), pagination },
      props: { posts, pagination },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
