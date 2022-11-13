import { GetServerSideProps } from 'next';
import { postAPI } from '@/modules/Posts/api';
import { IPost } from '@/interfaces/models/IPost';
import PostDetailModule from '@/modules/Posts/pages/Detail';
import React from 'react';
import { rawToIPost } from '..';

type Props = {
  post: IPost;
};

const PostDetailPage = (props: Props) => {
  const { post } = props;
  return (
    <div>
      <PostDetailModule post={post} />
    </div>
  );
};

export default PostDetailPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { data } = await postAPI.getPostById(Number(id), { isSSR: true });
    return {
      props: { post: rawToIPost(data) },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
