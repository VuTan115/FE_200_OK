import { createSlice } from '@reduxjs/toolkit';
import { IVotingState, PostVoting } from './types';

const initialState: IVotingState = {
  postVotings: [],
  myVotings: [],
  subscribedPosts: [],
};
const slice = createSlice({
  name: 'voting',
  initialState: initialState,
  reducers: {
    upvote: (state, action) => {
      const { postId }: { postId: number } = action.payload;
      const _meVotings = state.myVotings.filter((voting) => voting.id !== postId);
      return {
        ...state,
        myVotings: [
          ..._meVotings,
          {
            id: postId,
            downvote: 0,
            upvote: 1,
          },
        ],
      };
    },
    downvote: (state, action) => {
      const { postId }: { postId: number } = action.payload;
      const _meVotings = state.myVotings.filter((voting) => voting.id !== postId);
      return {
        ...state,
        myVotings: [
          ..._meVotings,
          {
            id: postId,
            downvote: 1,
            upvote: 0,
          },
        ],
      };
    },
    unvote: (state, action) => {
      const { postId }: { postId: number } = action.payload;
      const _meVotings = state.myVotings.filter((voting) => voting.id !== postId);
      return {
        ...state,
        myVotings: _meVotings,
      };
    },
    setVotings: (state, action) => {
      const { postVotings }: { postVotings: PostVoting[] } = action.payload;
      return {
        ...state,
        postVotings: postVotings,
      };
    },
    setMyVotings: (state, action) => {
      const { myVotings }: { myVotings: PostVoting[] } = action.payload;
      return {
        ...state,
        myVotings: myVotings,
      };
    },
    subscribeVotingPosts: (state, action) => {
      const { postIds }: { postIds: number[] } = action.payload;
      const _subscribedPosts = new Set(state.subscribedPosts);
      postIds.forEach((postId) => {
        _subscribedPosts.add(postId);
      });
      return {
        ...state,
        subscribedPosts: [..._subscribedPosts],
      };
    },
    unsubscribeVotingPosts: (state, action) => {
      const { postIds }: { postIds: number[] } = action.payload;
      const _subscribedPosts = new Set(state.subscribedPosts);
      postIds.forEach((postId) => {
        _subscribedPosts.delete(postId);
      });
      return {
        ...state,
        subscribedPosts: [..._subscribedPosts],
      };
    },
  },
});

export const {
  upvote,
  unvote,
  downvote,
  setVotings,
  setMyVotings,
  subscribeVotingPosts,
  unsubscribeVotingPosts,
} = slice.actions;

export default slice.reducer;
