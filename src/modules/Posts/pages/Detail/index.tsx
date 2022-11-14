import BigPostCard from '@/components/PostsCard/BigCard';
import { IPost } from '@/interfaces/models/IPost';
import { Avatar, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { useEffect, useState } from 'react';

type Props = {
  post: IPost;
};

const PostDetailModule = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const { post } = props;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div className="flex gap-5">
      <div className="card w-3/4">
        <BigPostCard post={post} />
      </div>

      <div className="card w-1/4 flex flex-col gap-5">
        <h2 className="text-xl">Các bài viết nổi bật</h2>
        <Card className="w-full" loading={loading}>
          <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
            title="Bánh mỳ ngon"
            description={''.split(' ').slice(0, 20).join(' ')}
          />
        </Card>
      </div>
    </div>
  );
};

export default PostDetailModule;
