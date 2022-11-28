import { mark, set, unmark } from './slice';

export function asyncMarkPost(postId: number): any {
  return (dispatch) => {
    dispatch(mark({ postId }));
  };
}

export function asyncUnmarkPost(postId: number): any {
  return (dispatch) => {
    dispatch(unmark({ postId }));
  };
}

export function asyncSet(postIds: number[]): any {
  return (dispatch) => {
    dispatch(set({ postIds }));
  };
}
