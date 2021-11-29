import React from 'react';
import { Comment } from '@hocgin/ui';
import {
  DislikeParamsType,
  LikeParamsType,
  PagingDataType,
  PagingParamsType,
  ReplyDataType,
  ReplyParamsType, ScrollDataType, ScrollParamsType,
  UserDataType, UserParamsType,
} from '@/Comment/components/type';

let currentUser = {
  id: 1,
  title: '测试用户',
};

let likeOrDislike = (type?: string) => ({
  likes: new Date().getTime(),
  disliked: 1,
  action: type,
});

let records = [
  {
    replyId: 22,
    id: 2,
    likes: 10,
    disliked: 20,
    content: '666',
    action: 'liked',
    author: {
      id: 1,
      title: 'hocgin2',
      avatarUrl: '',
      href: '',
    },
    replier: {
      id: 1,
      title: 'hocgin',
      avatarUrl: '',
      href: '',
    },
    hasReply: true,
    datetime: '1 分钟前',
  },
];
let showResult = {
  current: 1,
  total: 12,
  size: 10,
  records: records,
};

let reply = (replyId?: any, replyContent?: any) => {
  return ({
    replyId: replyId,
    id: 2,
    likes: 10,
    disliked: 20,
    content: replyContent,
    action: 'liked',
    author: {
      id: 1,
      title: 'hocgin2',
      avatarUrl: '',
      href: '',
    },
    replier: {
      id: 1,
      title: 'hocgin',
      avatarUrl: '',
      href: '',
    },
    hasReply: false,
    datetime: '1 分钟前',
  });
};
let useAction = {
  reply: async (args: ReplyParamsType) => {
    let replyParams = args as ReplyParamsType;
    let replyId = replyParams?.commentId;
    let replyContent = replyParams?.content;
    return reply(replyId, replyContent) as ReplyDataType;
  },
  // 查询根评论
  scroll: async (args: ScrollParamsType) => {
    return {
      hasMore: false,
      nextId: undefined,
      records: records,
    } as ScrollDataType;
  },
  // 查询子评论
  paging: async (args: PagingParamsType) => {
    return showResult as PagingDataType;
  },
  like: async (args: LikeParamsType) => {
    return likeOrDislike('like') as any;
  },
  dislike: async (args: DislikeParamsType) => {
    return likeOrDislike('dislike') as any;
  },
  // 当前登陆用户
  user: async (args: UserParamsType) => currentUser as UserDataType,
};

export default () => {
  return (
    <Comment total={10} useAction={useAction} />
  );
};
