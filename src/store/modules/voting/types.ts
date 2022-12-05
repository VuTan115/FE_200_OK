export type IVotingState = {
  postVotings: PostVoting[];
  myVotings: PostVoting[];
  subscribedPosts: number[];
};

export enum VotingType {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
}

export type PostVoting = {
  id: number;
  upvote: number;
  downvote: number;
};
