import CreateEditPostModule from '@/modules/Posts/pages/Create_Edit';
import React from 'react';
import { GetServerSideProps } from 'next';
import { postAPI } from '@/modules/Posts/api';
import { IPost } from '@/interfaces/models/IPost';
import PostDetailModule from '@/modules/Posts/pages/Detail';
import { rawToIPost } from '@/pages';
import { getQuestionRespose } from '@/modules/SugesstionRecipe/api';

type Props = {
  post: IPost;
  tags?: getQuestionRespose[];
};

const EditPostPage = (props: Props) => {
  const { post, tags } = props;
  return (
    <>
      <CreateEditPostModule post={post} tags={tags} />
    </>
  );
};

export default EditPostPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { data } = await postAPI.getPostById(Number(id), { isSSR: true });
    console.log(data);
    return {
      props: { post: rawToIPost(data), tags: data.questions },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
