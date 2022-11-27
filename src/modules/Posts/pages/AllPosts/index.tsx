import MediumPostCard from '@/components/PostsCard/MediumCard';
import { IPost } from '@/interfaces/models/IPost';
import { rawToIPost } from '@/pages';
import { appLibrary } from '@/shared/utils/loading';
import { TOffset } from '@/types';
import { message, Pagination } from 'antd';
import { useState } from 'react';
import { postAPI } from '../../api';

type Props = {
  posts: IPost[];
  pagination?: TOffset;
};

const PostListModule = (props: Props) => {
  const { posts, pagination } = props;
  const handlePaginationChange = (page: number, pageSize?: number) => {
    const offset = page - 1;
    onPaginationChange(offset, pageSize);
  };
  const [postState, setPostState] = useState<IPost[]>(posts);
  const onPaginationChange = async (offset: number, pageSize?: number) => {
    try {
      appLibrary.showloading();
      const {
        data: { posts, pagination },
      } = await postAPI.getPosts({ offset: offset, limit: pageSize });
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
      <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {postState.map((post) => (
          <MediumPostCard post={post} />
        ))}
      </div>
      {pagination && (
        <Pagination
          defaultCurrent={1}
          total={pagination.total}
          defaultPageSize={10}
          onChange={handlePaginationChange}
          className="flex mx-auto justify-center items-center"
        />
      )}
    </>
  );
};

export default PostListModule;
