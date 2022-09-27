import { TimeLike } from 'fs';

export type User = {
  id: string;
  name: string;
  lolSummonerLevel: string;
  lolProfileIcon: string;
  realm: string;
  isModerator: boolean;
  isRioter: boolean;
  applicationsCanModerate: null;
  applicationBans: {};
  pinnedBoards: [];
  profile: null;
  stats: null;
  applicationSubscriptionChecksum: null;
  myDiscussionsVoteCount: 0;
  myDiscussionsUpVoteCount: 0;
  myDiscussionsDownVoteCount: 0;
  myCommentsVoteCount: 0;
  myCommentsUpVoteCount: 0;
  myCommentsDownVoteCount: 0;
  banEndsAt: null | TimeLike;
  modifiedAt: TimeLike;
  createdAt: TimeLike;
};

export type Comment = {
  id: string;
  message: string;
  htmlMessage: null;
  badWordReplacements: null;
  user: User;
  parentCommentId: null | string;
  replies: {
    comments: Comment[];
    moreCount: number;
    numLoaded: number;
    lastCommentId: string;
    sortType: null;
  };
  createdAt: TimeLike;
  modifiedAt: TimeLike;
  upVotes: number;
  downVotes: number;
  numChildren: number;
  score: number;
  levelsDeep: number;
  deleted: boolean;
  deletedAt: '';
  userVote: null;
  parentAuthorRead: true;
  attachments: null;
};

export type Application = {
  id: string;
  name: string;
  shortName: string;
  locale: string;
  discussionSummonerLevel: number;
  commentSummonerLevel: number;
  voteSummonerLevel: number;
  isCommunityBoard: boolean;
};

// isGlobalSticky can be true boolean
export type Discussion = {
  id: string;
  title: string;
  user: User | null;
  upVotes: number;
  downVotes: number;
  userVote: null;
  viewCount: number;
  softComments: number;
  totalComments: number;
  comments: {
    comments: Comment[];
    moreCount: number;
    numLoaded: number;
    lastCommentId: string | null;
    sortType: 'best' | 'recent' | 'new';
  };
  createdAt: TimeLike;
  modifiedAt: TimeLike;
  lastCommentedAt: null | TimeLike;
  originatingUrls: null;
  contentType: 'article' | 'news' | 'link' | 'qanda';
  content?: {
    sharedLink?: {
      provider?: string;
      url: string;
      image?: string;
      description?: string;
      thumbnail?: string;
      title?: string;
    };
    body?: string;
    url?: string;
    thumbnail?: string;
    status?: string;
    body_html?: string;
    body_small_html?: string;
    attachments: [{ status: string; name: string; url: string }];
    title?: string;
  };
  contentBodyBadWordReplacements:
    | null
    | { start: number; end: number; replaced: string }[];
  titleBadWordReplacements:
    | null
    | { start: number; end: number; replaced: string }[];
  commentVotingEnabled: boolean;
  commentCreationEnabled: boolean;
  isSticky: boolean;
  isGlobalSticky: boolean;
  deleted: boolean;
  deletedAt: TimeLike;
  hasRioterComments: boolean;
  rioterCommentIds: string[];
  application: Application;
};
