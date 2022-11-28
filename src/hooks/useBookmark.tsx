import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAPI } from '../modules/Posts/api';
import { IRootState } from '../store';
import {
  asyncMarkPost,
  asyncSet,
  asyncUnmarkPost,
} from '../store/modules/bookmark/thunk';

export const useBookmark = () => {
  const bookmark = useSelector((state: IRootState) => state.bookmark);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { data }: { data: number[] } = await postAPI.getBookmarkedPosts(2);
      dispatch(asyncSet(data));
    })();
  }, []);
  const isMarked = useCallback(
    (postId: number) => {
      return bookmark.bookmarkPostIds.includes(postId);
    },
    [bookmark.bookmarkPostIds]
  );

  const mark = (postId: number) => {
    return dispatch(asyncMarkPost(postId));
  };
  const unmark = (postId: number) => {
    return dispatch(asyncUnmarkPost(postId));
  };

  return [mark, unmark, isMarked];
};
