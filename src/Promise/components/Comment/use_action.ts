import {
  DislikeParamsType, HistoryParamsType,
  LikeParamsType,
  MentionsParamsType,
  PagingDataType,
  PagingParamsType,
  ReplyDataType,
  ReplyParamsType, ReportParamsType,
  ScrollDataType,
  ScrollParamsType,
  UserDataType,
  UserParamsType,
} from '@/Comment/components/type';

import service from './service';
import { UmsService } from '@/Request';

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
  history: async (args: HistoryParamsType) =>
    (await service.history(refType, refId, args?.commentId)) as any,
  report: async (args: ReportParamsType) =>
    (await service.report(refType, refId, args?.commentId, args?.reason)) as any,
  // 当前登陆用户
  user: async (args: UserParamsType) => {
    return asUser(await UmsService.getCurrentUser(args?.force)) as UserDataType;
  },
  // 提及用户
  mentionUser: async (args: MentionsParamsType) =>
    ((await UmsService.searchUser(args)) || []).map(asUser),
});

let asUser = (user: any) => {
  if (!user) {
    return null;
  }

  let { id, title, nickname, avatarUrl, avatar, href } = user;
  return {
    id,
    title: title || nickname,
    avatarUrl: avatarUrl || avatar,
    href,
  } as UserDataType;
};
