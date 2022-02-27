import {
  UserType,
  ID,
  PageRo,
  ScrollRo,
  IScroll,
  IPage,
} from '@/Utils/interface';

export type ParamsType =
  | [ReplyParamsType]
  | [PagingParamsType]
  | [LikeParamsType]
  | [DislikeParamsType]
  | [UserParamsType]
  | [ScrollParamsType]
  | [PageRo];
export type DataType =
  | ReplyDataType
  | PagingDataType
  | LikeDataType
  | DislikeDataType
  | ScrollDataType
  | UserDataType
  | any;

export interface UseAction {
  reply: (args: ReplyParamsType) => Promise<ReplyDataType>;
  // 查询根评论
  scroll: (args: ScrollParamsType) => Promise<ScrollDataType>;
  // 查询子评论
  paging: (args: PagingParamsType) => Promise<PagingDataType>;
  like: (args: LikeParamsType) => Promise<LikeDataType>;
  dislike: (args: DislikeParamsType) => Promise<DislikeDataType>;
  // 当前登陆用户
  user: (args: UserParamsType) => Promise<UserDataType>;
  // 提及用户
  mentionUser: (args: MentionsParamsType) => Promise<UserDataType[]>;
}

// ========================================================
export interface MentionsParamsType {
  keyword: string;
}

// ========================================================
export interface CommentType {
  replyId?: ID;
  id: ID;
  datetime: string;
  /**
   * 评论人
   */
  author: UserType;
  /**
   * 被评论人
   */
  replier: UserType;
  content?: string;
  likes?: number;
  disliked?: number;
  hasReply: boolean;
  action: 'liked' | 'disliked' | 'none';
}

// ========================================================
export interface ScrollParamsType extends ScrollRo {}

export interface ScrollDataType extends IScroll<CommentType> {}

// ========================================================
export interface UserParamsType {}

export interface UserDataType extends UserType {}

// ========================================================
export interface ReplyParamsType {
  commentId?: ID;
  content?: string;
}

export interface ReplyDataType extends CommentType {}

// ========================================================
export interface PagingParamsType extends PageRo {
  parentId: ID;
}

export interface PagingDataType extends IPage<CommentType> {}

// ========================================================
export interface LikeParamsType {
  commentId: ID;
}

export interface LikeDataType {
  action: 'liked' | 'disliked' | 'none';
  likes?: number;
  disliked?: number;
}

// ========================================================
export interface DislikeParamsType {
  commentId: ID;
}

export interface DislikeDataType {
  action: 'liked' | 'disliked' | 'none';
  likes?: number;
  disliked?: number;
}
