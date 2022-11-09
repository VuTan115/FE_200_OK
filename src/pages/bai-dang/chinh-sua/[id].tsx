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
  tags?: {
    id: number;
    name: string;
    is_required: boolean;
    questions: { id: number; content: string }[];
  }[];
};

const EditPostPage = (props: Props) => {
  const { post, tags } = props;
  console.log(tags);
  return (
    <>
      <CreateEditPostModule post={post} />
    </>
  );
};

export default EditPostPage;

const mapToRequiredTags = (
  tags: {
    id: number;
    name: string;
    is_required: boolean;
    questions: { id: number; content: string }[];
  }[]
): getQuestionRespose[] => {
  // const requiredTags: getQuestionRespose[] = tags.map((tag) => {
  //   return {
  //     id: tag.id,
  //     content: tag.name,
  //     // tags: tag.questions,
  //   };
  // });

  return [];
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const { id } = ctx.params;
    const { data } = await postAPI.getPostById(Number(id));
    console.log(data.tags[0]);
    return {
      props: { post: rawToIPost(data), tags: data.tags },
    };
  } catch (error) {
    console.log(error);
    return { notFound: true };
  }
};
