import { ID, IScroll, ScrollRo } from '@/Utils/interface';

export interface ScrollParamsType extends ScrollRo {
  keyword?: string;
}

// 您订阅的 "文章" 有一条新的 "评论"
interface NoticeMessage {
  content: string;
  eventType: string;
  eventTypeName: string;
  refType: string;
  refTypeName: string;
}

// 收到一条系统消息
interface SystemMessage {
  content: string;
}

// [] 张三
// 收到一条来自 "张三" 的私信
interface PersonalMessage {
  content: string;
}

export interface MessageDataType {
  id: ID,
  messageType: string;
  noticeMessage?: NoticeMessage;
  systemMessage?: SystemMessage;
  personalMessage?: PersonalMessage;
  readyAt?: string;
  receiverUser?: ID;
  receiverUserName?: string;
}

export interface UseAction {
  scroll: (args: ScrollParamsType) => Promise<IScroll<MessageDataType>>;
}
