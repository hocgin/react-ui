import React, { useState, useRef } from 'react';
import { Avatar, Button, List, Input } from 'antd';
import styles from './index.less';
import { SearchOutlined } from '@ant-design/icons';
import { ID, LocalDateTime } from '@/Utils/interface';
import { Format, Editor as GEditor, Utils } from '@hocgin/ui';
import classnames from 'classnames';
import {
  MessageDataType,
  sendPersonalParamsType,
  UseAction,
} from '@/Notification/components/types';
import { useInfiniteScroll, useRequest } from 'ahooks';

const UserCard: React.FC<{
  datetime?: LocalDateTime;
  nickname?: string;
  selected?: boolean;
  content?: string;
  avatar?: any;
  onClick?: (id: any) => void;
}> = ({
  datetime,
  nickname,
  avatar,
  onClick,
  selected = false,
  content = ' ',
}) => {
  let fmtDatetime = Format.DateTime.useDefRelativeFromNow(datetime);
  return (
    <div
      className={classnames(styles.userCard, {
        [styles.selected]: selected,
      })}
      onClick={onClick}
    >
      <Avatar size={40} src={avatar} />
      <div className={styles.body}>
        <div className={styles.title}>
          <span className={styles.name}>{nickname}</span>
          <span className={styles.datetime}>{fmtDatetime}</span>
        </div>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

const ChatHeader: React.FC<{ children?: any }> = ({ children }) => {
  return <div className={styles.header}>{children}</div>;
};

const ChatRecord: React.FC<{
  reverse?: boolean;
  avatar?: any;
  datetime?: LocalDateTime;
  content?: string;
}> = ({ reverse = false, datetime, content, avatar }) => {
  let fmtDatetime = Format.DateTime.useDefRelativeFromNow(datetime);
  return (
    <div
      className={classnames(styles.record, {
        [styles.reverse]: reverse,
      })}
    >
      <div className={styles.datetime}>{fmtDatetime}</div>
      <div className={styles.message}>
        <div>
          <Avatar size={40} src={avatar} />
        </div>
        <div className={styles.body}>
          <GEditor
            contentClassName={styles.bodyContent}
            value={content}
            editable={false}
          />
        </div>
      </div>
    </div>
  );
};

const ChatBody: React.FC<{ chatUserId: any; useAction: UseAction }> = ({
  chatUserId,
  useAction,
}) => {
  console.log('chatUserId', chatUserId);
  const ref = useRef<any>();
  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d) =>
      useAction?.scrollWithPersonalMessage?.({ ...d, chatUserId }) ??
      Promise.resolve({} as any),
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
    },
  );
  return (
    <div ref={ref} className={styles.chatBody}>
      {(data?.records || []).map(
        ({
          senderUser,
          sendAt,
          senderUserAvatarUrl,
          personalMessage,
        }: MessageDataType) => (
          <ChatRecord
            datetime={sendAt}
            avatar={senderUserAvatarUrl}
            content={personalMessage?.content}
            reverse={senderUser !== chatUserId}
          />
        ),
      )}
    </div>
  );
};

const Editor: React.FC<{ useAction: UseAction; chatUserId: ID }> = ({
  useAction,
  chatUserId,
}) => {
  let editorRef = useRef<any>();
  let [content, setContent] = useState<string | undefined>('');
  let sendRequest = useRequest(
    Utils.Lang.nilService(useAction.sendWithPersonalMessage, {}),
    {
      manual: true,
      retryCount: 3,
      debounceWait: 300,
      onSuccess: (data: any) => {
        // 清除原先内容
        editorRef?.current?.clearContent();
      },
    },
  );

  let onSubmitSend = () => {
    if (`${content}`.trim().length === 0) {
      return;
    }

    sendRequest.run({
      receiverUserId: chatUserId,
      content,
    } as sendPersonalParamsType);
  };

  return (
    <div className={styles.editor}>
      <GEditor
        editorRef={editorRef}
        className={styles.editorContent}
        onChange={() => setContent(editorRef.current.getHTML())}
      />
      <div className={styles.editorToolbar}>
        <div />
        <Button type="primary" onClick={onSubmitSend}>
          发送
        </Button>
      </div>
    </div>
  );
};

const UserHeader: React.FC<{}> = () => {
  return (
    <div className={styles.userHeader}>
      <Input placeholder="搜索联系人" suffix={<SearchOutlined />} />
    </div>
  );
};

export const Chat: React.FC<{ useAction: UseAction }> = ({ useAction }) => {
  const ref = useRef<any>();
  // 与谁聊天
  let [chatUser, setChatUser] = useState<{ id: any; title: string }>();
  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    Utils.Lang.nilService(useAction?.scrollLastChatWithPersonalMessage, {}),
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
    },
  );

  return (
    <div className={styles.chat}>
      <div className={styles.left}>
        <UserHeader />
        <div ref={ref} className={styles.userList}>
          <List
            rowKey="id"
            itemLayout="horizontal"
            dataSource={data?.records || []}
            renderItem={({
              sendAt,
              senderUser,
              senderUserName,
              senderUserAvatarUrl,
              description,
            }: MessageDataType) => (
              <UserCard
                selected={chatUser?.id === senderUser}
                avatar={senderUserAvatarUrl}
                nickname={senderUserName}
                datetime={sendAt}
                content={description}
                onClick={() =>
                  setChatUser({ id: senderUser, title: `${senderUserName}` })
                }
              />
            )}
          />
        </div>
      </div>
      <div className={styles.right}>
        {chatUser ? (
          <>
            <ChatHeader>{chatUser?.title}</ChatHeader>
            <ChatBody
              key={`${chatUser.id}`}
              chatUserId={chatUser.id}
              useAction={useAction}
            />
            <Editor chatUserId={chatUser.id} useAction={useAction} />
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
