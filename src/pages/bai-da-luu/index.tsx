import { IPost } from '@/interfaces/models/IPost';
import { postAPI } from '@/modules/Posts/api';
import PostListModule from '@/modules/Posts/pages/AllPosts';
import { TOffset } from '@/types';
import { GetServerSideProps } from 'next';

type Props = {
  pagination: TOffset;
  posts: IPost[];
};

const BookmarkedPostsPage = (props: Props) => {
  const { posts, pagination } = props;
  return (
    <>
      <PostListModule posts={posts} pagination={pagination} />
    </>
  );
};

export default BookmarkedPostsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const {
      data: { posts, pagination },
    } = await postAPI.getAllBookmarkedPosts({ isSSR: true });
    console.log(posts);
    return {
      props: { posts, pagination },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
