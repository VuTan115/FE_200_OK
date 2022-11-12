import { GetServerSideProps } from 'next';
import { postAPI } from '@/modules/Posts/api';
import { IPost } from '@/interfaces/models/IPost';
import PostDetailModule from '@/modules/Posts/pages/Detail';
import React from 'react';
import PostListModule from '@/modules/Posts/pages/AllPosts';
import { rawToIPost } from '..';
import { TOffset } from '@/types';

type Props = {
  posts: IPost[];
  pagination: TOffset;
};

const PostsPage = (props: Props) => {
  const { posts, pagination } = props;
  return (
    <div>
      <PostListModule posts={posts ?? []} pagination={pagination} />
    </div>
  );
};

export default PostsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const {
      data: { posts, pagination },
    } = await postAPI.getUserPosts({ isSSR: true }); // your fetch function here
    return {
      props: { posts: posts.map((item) => rawToIPost(item)), pagination },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
