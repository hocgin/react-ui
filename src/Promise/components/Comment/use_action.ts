import {
  DislikeParamsType,
  LikeParamsType,
  PagingDataType,
  PagingParamsType,
  ReplyDataType,
  ReplyParamsType,
  ScrollDataType,
  ScrollParamsType,
  UserDataType,
  UserParamsType,
} from '@/Comment/components/type';

import service from './service';

export default (refType: any, refId: any) => ({
  reply: async (args: ReplyParamsType) => {
    let replyParams = args as ReplyParamsType;
    let replyId = replyParams?.commentId;
    let replyContent = replyParams?.content;
    return (await service.reply(
      refType,
      refId,
      replyId,
      replyContent,
    )) as ReplyDataType;
  },
  // 查询根评论
  scroll: async (args: ScrollParamsType) =>
    (await service.scroll(refType, refId, args)) as ScrollDataType,
  // 查询子评论
  paging: async (args: PagingParamsType) =>
    (await service.paging(
      refType,
      refId,
      args?.parentId,
      args,
    )) as PagingDataType,
  like: async (args: LikeParamsType) =>
    (await service.like(refType, refId, args?.commentId)) as any,
  dislike: async (args: DislikeParamsType) =>
    (await service.dislike(refType, refId, args?.commentId)) as any,
  // 当前登陆用户
  user: async (args: UserParamsType) => {
    let { id, title, nickname, avatarUrl, avatar, href } =
      (await service.getCurrentUser()) as any;
    return {
      id,
      title: title || nickname,
      avatarUrl: avatarUrl || avatar,
      href,
    } as UserDataType;
  },
});
