import { ID, IScroll, LocalDateTime, ScrollRo } from '@/Utils/interface';

type MessageType = 'system_message' | 'personal_message' | 'notice_message';

export interface ScrollParamsType extends ScrollRo {
  keyword?: string;
}

export interface ScrollPersonalParamsType extends ScrollRo {
  keyword?: string;
  chatUserId?: ID;
}

export interface sendPersonalParamsType {
  receiver: ID;
  content?: string;
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

export interface MessageStat {
  unreadTotalCount?: number;
  unreadSystemCount?: number;
  unreadPersonCount?: number;
  unreadNoticeCount?: number;
}

export interface MessageDataType {
  id: ID;
  messageType: MessageType;
  title?: string;
  description?: string;
  linkUrl?: string;
  noticeMessage?: NoticeMessage;
  systemMessage?: SystemMessage;
  personalMessage?: PersonalMessage;
  readyAt?: LocalDateTime;
  sendAt?: LocalDateTime;
  senderUser?: ID;
  senderUserName?: string;
  senderUserAvatarUrl?: string;
  receiverUser?: ID;
  receiverUserName?: string;
  receiverUserAvatarUrl?: string;
}

export interface UseAction {
  // [通知] 所有会话
  scrollWithNoticeMessage?: (
    args: ScrollParamsType,
  ) => Promise<IScroll<MessageDataType>>;
  // [公告] 所有会话
  scrollWithSystemMessage?: (
    args: ScrollParamsType,
  ) => Promise<IScroll<MessageDataType>>;
  // [私信] 所有会话
  scrollWithPersonalMessage?: (
    args: ScrollPersonalParamsType,
  ) => Promise<IScroll<MessageDataType>>;
  // [私信] 最近会话
  scrollLastChatWithPersonalMessage?: (
    args: ScrollParamsType,
  ) => Promise<IScroll<MessageDataType>>;
  // [私信] 发送私信
  sendWithPersonalMessage?: (args: sendPersonalParamsType) => Promise<any>;
  // 消息状态
  stat?: () => Promise<MessageStat>;
}
