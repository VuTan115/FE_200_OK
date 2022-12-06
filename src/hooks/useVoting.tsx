import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postAPI } from '../modules/Posts/api';
import { IRootState } from '../store';
import {
  asyncDownvote,
  asyncSetMyVotings,
  asyncSetVotings,
  asyncSubscribeVotingPosts,
  asyncUnsubscribeVotingPosts,
  asyncUnvote,
  asyncUpvote,
} from '../store/modules/voting/thunk';
import { PostVoting } from '../store/modules/voting/types';

export const useVoting = () => {
  const voting = useSelector((state: IRootState) => state.voting);
  const dispatch = useDispatch();
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if (voting.subscribedPosts.length === 0) {
      return;
    }
    if (!isSubscribed) {
        return;
    }
    refetch(voting.subscribedPosts);
    const callback = async () => {
      await refetch(voting.subscribedPosts);
    };
    const interval = setInterval(callback, 5000);
    return () => clearInterval(interval);
  }, [JSON.stringify(voting.subscribedPosts), isSubscribed]);

  useEffect(() => {
    return () => {
      dispatch(asyncUnsubscribeVotingPosts(voting.subscribedPosts));
    };
  }, []);

  useEffect(() => {
    (async () => {
      const { data }: { data: PostVoting[] } = await postAPI.getUserVotings(2);
      dispatch(asyncSetMyVotings(data));
    })();
  }, []);

  const refetch = useCallback(async (postIds) => {
    const { data }: { data: PostVoting[] } = await postAPI.getVotingsOf(postIds);
    dispatch(asyncSetVotings(data));
  }, []);

  const subscribeVotings = (input: number | number[]) => {
    setIsSubscribed(true)
    let array = voting.subscribedPosts;
    if (Array.isArray(input)) {
      array = Array.from(new Set([...array, ...input]).values());
    } else {
      array = Array.from(new Set([...array, input]).values());
    }
    dispatch(asyncSubscribeVotingPosts(array));
  };
  const unSubscribeVotings = (input: number | number[]) => {
    setIsSubscribed(false)
    let array = voting.subscribedPosts;
    if (Array.isArray(input)) {
      array = array.filter((postId) => !input.includes(postId));
    } else {
      array = array.filter((postId) => postId !== input);
    }
    dispatch(asyncUnsubscribeVotingPosts(array));
  };

  const voteOfPost = useCallback(
    (postId: number) => {
      const vote = voting.postVotings?.find((voting) => voting.id === postId);
      if (!vote) {
        return (0).toFixed(1);
      }
      if (vote.upvote + vote.downvote === 0) {
        return (0).toFixed(1);
      }
      return ((vote.upvote / (vote.downvote + vote.upvote)) * 5.0).toFixed(1);
    },
    [JSON.stringify(voting.postVotings)]
  );

  const upvote = useCallback(async (postId: number) => {
    dispatch(asyncUpvote(postId));
    await postAPI.upvotePost({ postId }, '2');
    await refetch(voting.subscribedPosts);
  }, []);

  const downvote = useCallback(async (postId: number) => {
    dispatch(asyncDownvote(postId));
    await postAPI.downvotePost({ postId }, '2');
    await refetch(voting.subscribedPosts);
  }, []);

  const unvote = useCallback(async (postId: number) => {
    dispatch(asyncUnvote(postId));
    await postAPI.unvotePost({ postId }, '2');
    await refetch(voting.subscribedPosts);
  }, []);

  const myVoteOfPost = useCallback(
    (postId: number): PostVoting => {
      const vote = voting.myVotings?.find((voting) => voting.id === postId);
      if (!vote) {
        return {
          upvote: 0,
          downvote: 0,
          id: postId,
        };
      }
      return vote;
    },
    [JSON.stringify(voting.myVotings)]
  );

  return {
    upvote,
    downvote,
    unvote,
    voteOfPost,
    subscribeVotings,
    unSubscribeVotings,
    myVoteOfPost,
  };
};
