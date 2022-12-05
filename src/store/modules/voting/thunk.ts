import {
  downvote,
  setMyVotings,
  setVotings,
  subscribeVotingPosts,
  unsubscribeVotingPosts,
  unvote,
  upvote,
} from './slice';
import { PostVoting } from './types';

export function asyncUpvote(postId: number): any {
  return (dispatch) => {
    dispatch(upvote({ postId }));
  };
}

export function asyncDownvote(postId: number): any {
  return (dispatch) => {
    dispatch(downvote({ postId }));
  };
}

export function asyncUnvote(postId: number): any {
  return (dispatch) => {
    dispatch(unvote({ postId }));
  };
}
export function asyncSetVotings(postVotings: PostVoting[]): any {
  return (dispatch) => {
    dispatch(setVotings({ postVotings }));
  };
}

export function asyncSetMyVotings(myVotings: PostVoting[]): any {
  return (dispatch) => {
    dispatch(setMyVotings({ myVotings }));
  };
}

export function asyncSubscribeVotingPosts(postIds: number[]): any {
  return (dispatch) => {
    dispatch(subscribeVotingPosts({ postIds }));
  };
}

export function asyncUnsubscribeVotingPosts(postIds: number[]): any {
  return (dispatch) => {
    dispatch(unsubscribeVotingPosts({ postIds }));
  };
}
