/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React, { useState } from 'react';
import { NotificationBox, NotificationIndicator } from '@hocgin/ui';
import styles from './index.less';
import { Divider } from 'antd';
import { ScrollParamsType, ScrollPersonalParamsType } from '@/Notification/components/types';

/**
 * sendAt, senderUserName, senderUserAvatarUrl, personalMessage
 */
let useAction = {
  scrollLastChatWithPersonalMessage: async (args: any) => {
    console.log('scrollLastChatWithPersonalMessage::', args);
    return {
      hasMore: false,
      nextId: undefined,
      records: [
        {
          id: 1,
          messageType: 'personal_message',
          senderUserAvatarUrl: '张三',
          senderUserName: '张三',
          senderUser: 11,
          description: '我是张三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 2,
          messageType: 'personal_message',
          senderUserAvatarUrl: '李三',
          senderUserName: '李三',
          senderUser: 12,
          description: '我是李三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 3,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 4,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 5,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 6,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 7,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 8,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 9,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 10,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 11,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 12,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 13,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 14,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 15,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 16,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: 13,
          description: '我是万三的私信',
          sendAt: '2021-06-01T00:30:30.159',
        },
      ] as any,
    };
  },
  scrollWithPersonalMessage: async (args: ScrollPersonalParamsType) => {
    console.log('scrollWithPersonalMessage::', args);
    let senderUser = args?.chatUserId;
    return {
      hasMore: false,
      nextId: undefined,
      records: [
        {
          id: 1,
          messageType: 'personal_message',
          senderUserAvatarUrl: '张三',
          senderUserName: '张三',
          senderUser: 11,
          personalMessage: {
            content:
              '我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 2,
          messageType: 'personal_message',
          senderUserAvatarUrl: '李三',
          senderUserName: '李三',
          senderUser: senderUser,
          personalMessage: {
            content: '我是李三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 3,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: senderUser,
          personalMessage: {
            content: '我是万三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 4,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: senderUser,
          personalMessage: {
            content: '我是万三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 5,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: senderUser,
          personalMessage: {
            content: '我是万三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 6,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: senderUser,
          personalMessage: {
            content: '我是万三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 7,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: senderUser,
          personalMessage: {
            content: '我是万三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 8,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: senderUser,
          personalMessage: {
            content: '我是万三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 9,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: senderUser,
          personalMessage: {
            content: '我是万三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 10,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: senderUser,
          personalMessage: {
            content: '我是万三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 11,
          messageType: 'personal_message',
          senderUserAvatarUrl: '万三',
          senderUserName: '万三',
          senderUser: senderUser,
          personalMessage: {
            content: '我是万三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
      ] as any,
    };
  },
  scrollWithSystemMessage: async (args: ScrollParamsType) => {
    console.log('scrollWithSystemMessage', args);
    let senderUser = 3;
    return {
      hasMore: false,
      nextId: undefined,
      records: [
        {
          id: 1,
          messageType: 'system_message',
          title: '这是公告的标题',
          description: '张三的私信我是张三的私信我是张三的私信我是张三的',
          senderUserAvatarUrl: '张三',
          senderUserName: '张三',
          senderUser: 11,
          systemMessage: {
            content:
              '我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 2,
          messageType: 'system_message',
          title: '这是公告的标题',
          description: '张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的',
          senderUserAvatarUrl: '李三',
          senderUserName: '李三',
          senderUser: senderUser,
          systemMessage: {
            content: '我是公告',
          },
          sendAt: '2021-06-01T00:30:30.159',
        }] as any,
    };
  },
  scrollWithNoticeMessage: async (args: ScrollParamsType) => {
    console.log('scrollWithNoticeMessage', args);
    let senderUser = 3;
    return {
      hasMore: false,
      nextId: undefined,
      records: [
        {
          id: 1,
          messageType: 'system_message',
          title: '这是公告的标题',
          description: '张三的私信我是张三的私信我是张三的私信我是张三的',
          senderUserAvatarUrl: '张三',
          senderUserName: '张三',
          senderUser: 11,
          noticeMessage: {
            content:
              '我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信我是张三的私信',
          },
          sendAt: '2021-06-01T00:30:30.159',
        },
        {
          id: 2,
          messageType: 'system_message',
          title: '这是公告的标题',
          description: '张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的张三的私信我是张三的私信我是张三的私信我是张三的',
          senderUserAvatarUrl: '李三',
          senderUserName: '李三',
          senderUser: senderUser,
          noticeMessage: {
            content: '我是公告',
          },
          sendAt: '2021-06-01T00:30:30.159',
        }] as any,
    };
  },
};

export default () => {
  let [count, setCount] = useState<number>(0);
  return (
    <>
      <Divider type='horizontal' />
      <NotificationIndicator
        count={count}
        onClick={() => setCount(Math.round(Math.random() * 10))}
        className={styles.ok}
      />
      <Divider type='horizontal' />
      <NotificationBox useAction={useAction} />
    </>
  );
};
