import { GetServerSideProps } from 'next';
import { postAPI } from '@/modules/Posts/api';
import { IPost } from '@/interfaces/models/IPost';
import PostDetailModule from '@/modules/Posts/pages/Detail';
import React from 'react';
import PostListModule from '@/modules/Posts/pages/AllPosts';
import { rawToIPost } from '..';

type Props = {
  posts: IPost[];
};

const PostsPage = (props: Props) => {
  const { posts } = props;
  return (
    <div>
      <PostListModule posts={posts ?? []} />
    </div>
  );
};

export default PostsPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const {
      data: { posts },
    } = await postAPI.getPosts({ isSSR: true }); // your fetch function here
    console.log(posts);
    return {
      props: { posts: posts.map((item) => rawToIPost(item)) },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
