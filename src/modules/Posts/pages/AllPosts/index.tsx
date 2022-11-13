import MediumPostCard from '@/components/PostsCard/MediumCard';
import { IPost } from '@/interfaces/models/IPost';
import React from 'react';

type Props = {
  posts: IPost[];
};

const PostListModule = (props: Props) => {
  const { posts } = props;
  return (
    <>
      <div className="grid  sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {posts.map((post, index) => (
          <MediumPostCard key={index} post={post} />
        ))}
      </div>
    </>
  );
};

export default PostListModule;
