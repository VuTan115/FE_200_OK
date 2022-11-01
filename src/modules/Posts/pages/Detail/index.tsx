import CookiesIcon, { CookiesSVG } from '@/components/CookiesIcon';
import { IPost } from '@/interfaces/models/IPost';
import {
  CommentOutlined,
  DownCircleOutlined,
  DownCircleTwoTone,
  EllipsisOutlined,
  ShareAltOutlined,
  UpCircleOutlined,
  UpCircleTwoTone,
} from '@ant-design/icons';
import Icon, { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { Avatar, Card, Rate, Skeleton, Tooltip } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { createElement, useEffect, useState } from 'react';
import CommentDetail from '../../components/Comment';

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

const mockData: IPost[] = [
  {
    id: 1,
    title: 'Title 1',
    content: 'Content 1',
    author: {
      id: 1,
      name: 'Trịnh Ngọc Tâm',
      avatar: 'https://joeschmoe.io/api/v1/random',
    },
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString(),
    tags: ['tag 1', 'tag2'],
    isReceipe: true,
  },
];
type Props = {
  data?: any;
};
const PostContent = (props: { post: IPost }) => {
  const { post } = props;
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
          avatar={<Avatar src={post.author.avatar} />}
          title={post.author.name}
          description={post.createdAt}
        />
        <div>
          2.5/5.0 &nbsp;
          <Rate
            allowHalf
            defaultValue={2.5}
            className="text-[var(--primary-color)]"
            character={({ index }: { index: number }) => customIcons[index + 1]}
          />
        </div>
      </div>
      <div className="post-content">
        <div className="title">
          <h1 className="text-2xl font-bold">{post.title}</h1>
        </div>
        <div className="content">
          <p>{post.content}</p>
        </div>
      </div>
    </>
  );
};

const PostDetailModule = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [isUpVoted, setIsUpVoted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="flex gap-5">
      <div className="card w-3/4">
        <Card className="w-full" actions={ActionBuilder()}>
          <Skeleton loading={loading} avatar active>
            {mockData.map((post) => (
              <PostContent post={post} key={post.id} />
            ))}
            <CommentDetail />
          </Skeleton>
        </Card>
      </div>

      <div className="card w-1/4 flex flex-col gap-5">
        <h2 className="text-xl">Các bài viết nổi bật</h2>
        <Card className="w-full" loading={loading}>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Bánh mỳ ngon"
            // description only has 200 characters max length

            description={''.split(' ').slice(0, 20).join(' ')}
          />
        </Card>
      </div>
    </div>
  );
};

export default PostDetailModule;
