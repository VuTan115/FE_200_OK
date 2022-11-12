import MediumPostCard from '@/components/PostsCard/MediumCard';
import SmallPostCard from '@/components/PostsCard/SmallCard';
import { IPost } from '@/interfaces/models/IPost';
import { rawToIPost } from '@/pages';
import { appLibrary } from '@/shared/utils/loading';
import { TOffset } from '@/types';
import { message, Pagination } from 'antd';
import { useState } from 'react';
import { postAPI } from '../../api';

type Props = {
  posts: IPost[];
  pagination: TOffset;
};

const LastesPostListModule = (props: Props) => {
  const { posts, pagination } = props;
  const [postState, setPostState] = useState<IPost[]>(posts);
  const handlePaginationChange = (page: number, pageSize?: number) => {
    console.log(page, pageSize);
    onPaginationChange(page, pageSize);
  };

  const onPaginationChange = async (page: number, pageSize?: number) => {
    try {
      appLibrary.showloading();
      const {
        data: { posts, pagination },
      } = await postAPI.getUserPosts({ offset: page, limit: pageSize });
      const newData = posts.map((item) => rawToIPost(item));
      setPostState(newData);
      appLibrary.hideloading();
    } catch (error) {
      appLibrary.hideloading();
      message.error('Đã có lỗi xảy ra! Vui lòng thử lại sau');
    }
  };

  return (
    <>
      <div className="grid  grid-cols-1 gap-4">
        {postState.map((post) => (
          <SmallPostCard post={post} />
        ))}
      </div>
      <Pagination
        defaultCurrent={1}
        total={pagination.total}
        defaultPageSize={10}
        onChange={handlePaginationChange}
        className="flex mx-auto justify-center items-center"
      />
    </>
  );
};

export default LastesPostListModule;
