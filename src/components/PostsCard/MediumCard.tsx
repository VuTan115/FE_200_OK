import SrcIcons from '@/assets/icons';
import SrcImages from '@/assets/images';
import { IPost } from '@/interfaces/models/IPost';
import { formatServerDateToDurationString } from '@/shared/helpers';
import { Avatar, Badge, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { caculateRate } from './BigCard';

type Props = {
  post: IPost;
};

const MediumPostCard = (props: Props) => {
  const { post } = props;
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(SrcIcons.iconLogo);
  useEffect(() => {
    image === SrcIcons.iconLogo &&
      fetch('https://foodish-api.herokuapp.com/api/')
        .then((res) => res.json())
        .then((data) => {
          setImage(data.image);
        });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);

  return (
    <div className="w-full relative">
      <Badge.Ribbon text={`${caculateRate(post.upvote, post.downvote)}/5.0`}>
        <Card
          hoverable
          className="overflow-hidden"
          cover={
            <Link href={`bai-dang/${post?.id}`}>
              <div className="relative h-full w-full min-h-[300px] hover:scale-105 hover:opacity-90 duration-200">
                <Image
                  fill
                  sizes="100%"
                  src={SrcImages.hamburger}
                  alt=""
                  loading="lazy"
                  blurDataURL={SrcIcons.iconLogo}
                  placeholder="blur"
                />
                <div
                  className="z-10 bg-[#dedede9c]
                top-1/2 left-1/2 absolute -translate-x-1/2 font-semibold text-2xl whitespace-nowrap p-1"
                >
                  {post.title}
                </div>
                {/* <div className="absolute top-0 left-0 w-full h-full opacity-0 hover:opacity-100 duration-200">
                  <div className="absolute flex flex-col justify-center items-center h-full w-full bg-slate-50">
                    {post?.tags?.map((tag) => (
                      <div key={tag.id}>{tag.name}</div>
                    ))}
                  </div>
                </div> */}
              </div>
            </Link>
          }
        >
          <div className="flex justify-between items-start w-full h-[130px]">
            <Meta
              className="w-full"
              avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
              title={
                <div className="flex justify-between items-center w-full">
                  <h3 className="text-lg font-bold">{post?.author?.name}</h3>
                  <p className="whitespace-nowrap font-[300] text-[14px]">
                    {post?.updatedAt.length > 0 &&
                      formatServerDateToDurationString(post?.updatedAt)}
                  </p>
                </div>
              }
              description={
                <div
                  className="card-description-custom text-ellipsis overflow-hidden mb-4"
                  dangerouslySetInnerHTML={{
                    // __html: post.content.split(' ').slice(0, 5).join(' ').concat('...'),
                    __html: post.content,
                  }}
                ></div>
              }
            />
          </div>
        </Card>
      </Badge.Ribbon>
    </div>
  );
};

export default MediumPostCard;
