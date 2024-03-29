import React from 'react';
import { Comment, LangKit } from '@hocgin/ui';
import {
  CommentType,
  DislikeParamsType,
  HistoryParamsType,
  HistoryType,
  LikeParamsType,
  PagingDataType,
  PagingParamsType,
  ReplyDataType,
  ReplyParamsType,
  ReportParamsType,
  ScrollDataType,
  ScrollParamsType,
  UserDataType,
  UserParamsType,
} from '@/Comment/components/type';
import { FloatButton } from 'antd';

let currentUser = {
  id: 1,
  title: '测试用户',
};

let likeOrDislike = (type?: string) => ({
  likes: new Date().getTime(),
  disliked: 1,
  action: type,
});

let records: CommentType[] = [
  {
    replyId: 22,
    id: 2,
    likes: 10,
    disliked: 20,
    idx: 1,
    content: '<p>这是一条回复</p> <a href="https://hocgin.top">HOCGIN</a>',
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
    isCommenter: Math.random() > 0.5,
    isInitiator: Math.random() > 0.5,
    hasReply: true,
    datetime: '1 分钟前',
  },
  {
    replyId: 22,
    id: 2,
    likes: 10,
    idx: 2,
    disliked: 20,
    content: '<p>这是一条回复</p> <a href="https://hocgin.top">HOCGIN</a>',
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
    isCommenter: Math.random() > 0.5,
    isInitiator: Math.random() > 0.5,
    hasReply: true,
    datetime: '1 分钟前',
  },
] as any[];
let showResult = {
  current: 1,
  total: 12,
  size: 10,
  records: records,
};

let reply = (replyId?: any, replyContent?: any) => {
  return {
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
    replier:
      replyId !== null
        ? {
            id: 1,
            title: 'hocgin',
            avatarUrl: '',
            href: '',
          }
        : null,
    hasReply: false,
    datetime: '1 分钟前',
  };
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
    console.log('查询根评论', args);
    return {
      hasMore: false,
      nextId: undefined,
      records: (records || []).map(
        ({ replyId, replier, ...record }: CommentType) => {
          return {
            ...record,
          };
        },
      ),
    } as ScrollDataType;
  },
  // 查询历史评论
  history: async (args: HistoryParamsType) => {
    return records as HistoryType;
  },
  // 查询子评论
  paging: async (args: PagingParamsType) => {
    console.log('查询子评论', args);
    await LangKit.sleep(2000);
    return showResult as PagingDataType;
  },
  like: async (args: LikeParamsType) => {
    return likeOrDislike('like') as any;
  },
  dislike: async (args: DislikeParamsType) => {
    return likeOrDislike('dislike') as any;
  },
  report: async (args: ReportParamsType) => {
    console.log('举报', args);
  },
  // 当前登陆用户
  user: async (args: UserParamsType) => {
    console.log('登陆--》');
    return currentUser as UserDataType;
  },
};

export default () => {
  return (
    <div
      style={
        { height: '200vh', display: 'flex', flexDirection: 'column' } as any
      }
    >
      <div style={{ flex: '1' } as any} />
      <Comment total={10} useAction={useAction} />
      <FloatButton.BackTop />
    </div>
  );
};
