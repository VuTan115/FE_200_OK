import { IPost } from '@/interfaces/models/IPost';
import { formatServerDateToDurationString } from '@/shared/helpers';
import { Avatar, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Link from 'next/link';
import React from 'react';

const SmallPostCard = (props: { post: IPost }) => {
  const { post } = props;
  return (
    <>
      <div className="flex bg-white">
        <div className="border-r border-solid border-gray-400 flex flex-col justify-center items-center p-5  min-w-[300px]">
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title={
              <span className="flex justify-center items-center">{post.author.name}</span>
            }
            className="flex flex-col justify-center items-center "
            description={
              <span className="text-center mx-auto w-full">
                {formatServerDateToDurationString(post.updatedAt)}
              </span>
            }
          />
        </div>
        <div className="flex flex-col p-5">
          <Link href={`/bai-dang/${post.id}`}>
            <h1 className="text-2xl font-semibold">{post.title}</h1>
          </Link>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content.split(' ').slice(0, 5).join(' ').concat('...'),
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default SmallPostCard;
