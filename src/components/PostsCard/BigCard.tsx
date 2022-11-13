import CookiesIcon from '@/components/CookiesIcon';
import { IPost } from '@/interfaces/models/IPost';
import CommentDetail from '@/modules/Posts/components/Comment';
import { formatServerDateToDurationString } from '@/shared/helpers';
import {
  CommentOutlined,
  DownCircleOutlined,
  DownCircleTwoTone,
  EditOutlined,
  EllipsisOutlined,
  ShareAltOutlined,
  UpCircleOutlined,
  UpCircleTwoTone,
} from '@ant-design/icons';
import { Avatar, Card, Rate, Skeleton, Tooltip } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Link from 'next/link';
import React, { createElement, useEffect, useState } from 'react';
export const caculateRate = (upvote: number, downvote: number) => {
  if (upvote === 0 && downvote === 0) {
    return Number(0).toFixed(1);
  }
  return Number(upvote / (upvote + downvote)).toFixed(1);
};
const ActionBuilder = () => {
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    setAction('liked');
  };

  const dislike = () => {
    setAction('disliked');
  };
  const actions = [
    <div onClick={like}>
      <Tooltip key="comment-basic-like" title="UpVote">
        <span>
          {createElement(action === 'liked' ? UpCircleTwoTone : UpCircleOutlined, {
            twoToneColor: action === 'liked' ? '#ffbc58' : '#eb2f96',
          })}
        </span>
      </Tooltip>
    </div>,
    <div onClick={dislike}>
      <Tooltip key="comment-basic-dislike" title="DownVote">
        <span>
          {createElement(action === 'disliked' ? DownCircleTwoTone : DownCircleOutlined, {
            twoToneColor: action === 'disliked' ? '#ffbc58' : '#eb2f96',
          })}
        </span>
      </Tooltip>
    </div>,
    <Tooltip key="comment-basic-dislike" title="Comment">
      <CommentOutlined />
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Chia sẻ">
      <ShareAltOutlined />
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Tùy chọn">
      <EllipsisOutlined key="ellipsis" />
    </Tooltip>,
  ];
  return actions;
};
const PostContent = (props: { post: IPost }) => {
  const { post } = props;
  const [currentRate, setCurrentRate] = useState(
    caculateRate(post.upvote, post.downvote)
  );
  const customIcons: Record<number, React.ReactNode> = {
    1: <CookiesIcon />,
    2: <CookiesIcon />,
    3: <CookiesIcon />,
    4: <CookiesIcon />,
    5: <CookiesIcon />,
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={post.author.name}
          description={formatServerDateToDurationString(post.createdAt)}
        />
        <div>
          {/* caculate percent of upvode and downvote */}

          <div className="flex flex-col justify-end items-end">
            <Tooltip key="comment-basic-like" title="Chỉnh sửa bài viết">
              <Link href={`/bai-dang/chinh-sua/${post.id}`}>
                <EditOutlined size={32} />
              </Link>
            </Tooltip>
            <div>
              {currentRate}/5.0 &nbsp;
              <Rate
                disabled
                allowHalf
                defaultValue={Number(currentRate)}
                className="text-[var(--primary-color)]"
                character={({ index }: { index: number }) => customIcons[index + 1]}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="post-content">
        <div className="title">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="list-tags my-4">
          {post.questions?.map((question, index) => (
            <div key={index} className="flex items-center mb-4">
              <h2 className="mr-4 font-bold">{question.content}</h2>
              {question.tags?.map((tag, index) => (
                <div key={index} className="btn-secondary mr-2">
                  <span>{tag.name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      </div>
    </>
  );
};

type Props = {
  post: IPost;
};

const BigPostCard = (props: Props) => {
  const { post } = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      <Card className="w-full" actions={ActionBuilder()}>
        <Skeleton loading={loading} avatar active>
          <PostContent post={post} />
          <CommentDetail />
        </Skeleton>
      </Card>
    </div>
  );
};

export default BigPostCard;
