import { createSlice } from '@reduxjs/toolkit';
import { IBookmarkState } from './types';

const initialState: IBookmarkState = {
  bookmarkPostIds: [],
};

const slice = createSlice({
  name: 'bookmark',
  initialState: initialState,
  reducers: {
    set(state, action) {
      return {
        bookmarkPostIds: action.payload.postIds,
      };
    },
    mark(state, action) {
      const { postId }: { postId: number } = action.payload;
      const _bookmarkPostIdsSet = new Set(state.bookmarkPostIds);
      if (!_bookmarkPostIdsSet.has(postId)) {
        _bookmarkPostIdsSet.add(postId);
      }
      return {
        bookmarkPostIds: [..._bookmarkPostIdsSet],
      };
    },
    unmark: (state, action) => {
      const { postId }: { postId: number } = action.payload;
      const _bookmarkPostIdsSet = new Set(state.bookmarkPostIds);
      if (_bookmarkPostIdsSet.has(postId)) {
        _bookmarkPostIdsSet.delete(postId);
        return {
          bookmarkPostIds: [..._bookmarkPostIdsSet],
        };
      }
      return state;
    },
  },
});

export const { mark, unmark, set } = slice.actions;

export default slice.reducer;
