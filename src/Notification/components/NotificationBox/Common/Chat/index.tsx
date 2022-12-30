import React, { useState, useRef } from 'react';
import { Avatar, Button, List, Input, Space } from 'antd';
import {
  SearchOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from '@ant-design/icons';
import { ID, LocalDateTime } from '@/_types';
import { default as GEditor } from '@/Editor';
import Loading from '@/Loading';
import Empty from '@/Empty';
import classnames from 'classnames';
import {
  MessageDataType,
  sendPersonalParamsType,
  UseAction,
} from '@/Notification/components/types';
import { useInfiniteScroll, useRequest, useToggle } from 'ahooks';
import { useInfiniteTopScroll } from '@hocgin/ahooks-kit';
import { ConfigContext } from '@/ConfigProvider';
import { FormatKit } from '@/_utils';
import { LangKit, StructKit } from '@/_utils';

const UserCard: React.FC<{
  datetime?: LocalDateTime;
  prefixCls?: string;
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
        ...props
      }) => {
  let fmtDatetime = FormatKit.parseLocalDatetime(datetime);

  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('notification--Chat-UserCard', props.prefixCls);

  return (
    <div
      className={classnames(prefixCls, {
        ['selected']: selected,
      })}
      onClick={onClick}
    >
      <Avatar size={40} src={avatar} />
      <div className={'body'}>
        <div className={'title'}>
          <span className={'name'}>{nickname}</span>
          <span className={'datetime'}>{fmtDatetime}</span>
        </div>
        <div className={'content'}>{content}</div>
      </div>
    </div>
  );
};

const ChatHeader: React.FC<{
  children?: any;
  prefixCls?: string;
}> = ({ children, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls(
    'notification--Chat-ChatHeader',
    props.prefixCls,
  );
  return <div className={prefixCls}>{children}</div>;
};

const ChatRecord: React.FC<{
  reverse?: boolean;
  avatar?: any;
  datetime?: LocalDateTime;
  content?: string;
}> = ({ reverse = false, datetime, content, avatar }) => {
  let fmtDatetime = FormatKit.parseLocalDatetime(datetime);
  return (
    <div
      className={classnames('record', {
        ['reverse']: reverse,
      })}
    >
      <div className={'datetime'}>{fmtDatetime}</div>
      <div className={'message'}>
        <div>
          <Avatar size={40} src={avatar} />
        </div>
        <div className={'body'}>
          <GEditor
            contentClassName={'bodyContent'}
            value={content}
            editable={false}
          />
        </div>
      </div>
    </div>
  );
};

const ChatBody: React.FC<{
  chatUserId: any;
  useAction: UseAction;
  prefixCls?: string;
}> = ({ chatUserId, useAction, ...props }) => {
  const ref = useRef<any>();
  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteTopScroll(
    (d?: any) =>
      LangKit.nilService(
        useAction?.scrollWithPersonalMessage?.bind(this, {
          nextId: d?.nextId,
          chatUserId,
        }),
        {},
      )().then(StructKit.getScrollData),
    {
      target: ref,
      isNoMore: (d) => !d?.hasMore || !d?.nextId,
    },
  );
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('notification--Chat-ChatBody', props.prefixCls);
  return (
    <div ref={ref} className={prefixCls}>
      {(data?.list || []).map((messageData: MessageDataType) => (
        <ChatRecord
          datetime={messageData?.sendAt}
          avatar={messageData?.senderUserAvatarUrl}
          content={messageData?.personalMessage?.content}
          reverse={messageData?.senderUser !== chatUserId}
        />
      ))}
      {noMore && (data?.list || []).length === 0 && (
        <Empty description={'暂无聊天内容'} />
      )}
      {loading && <Loading />}
    </div>
  );
};

const Editor: React.FC<{
  useAction: UseAction;
  chatUserId: ID;
  prefixCls?: string;
}> = ({ useAction, chatUserId, ...props }) => {
  let editorRef = useRef<any>();
  let [content, setContent] = useState<string | undefined>('');
  let sendRequest = useRequest(
    LangKit.nilService(useAction.sendWithPersonalMessage, {}),
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
      receiver: chatUserId,
      content,
    } as sendPersonalParamsType);
  };
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('notification--Chat-Editor', props.prefixCls);
  return (
    <div className={prefixCls}>
      <GEditor
        editorRef={editorRef}
        className={'editorContent'}
        onChange={() => setContent(editorRef.current.getHTML())}
      />
      <div className={'editorToolbar'}>
        <div />
        <Button type='primary' onClick={onSubmitSend}>
          发送
        </Button>
      </div>
    </div>
  );
};

const UserHeader: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div className={className}>
      <Space>
        <Input placeholder='搜索联系人' suffix={<SearchOutlined />} />
      </Space>
    </div>
  );
};

export const Chat: React.FC<{
  useAction: UseAction;
  prefixCls?: string;
}> = ({ useAction, ...props }) => {
  const ref = useRef<any>();
  // 与谁聊天
  let [chatUser, setChatUser] = useState<{ id: any; title: string }>();
  let [openUserList, { toggle }] = useToggle<boolean>(false);
  const { data, loading } = useInfiniteScroll(
    (d?: any) =>
      LangKit.nilService(
        useAction?.scrollLastChatWithPersonalMessage,
        {},
      )({ nextId: d?.nextId }).then(StructKit.getScrollData),
    {
      target: ref,
      isNoMore: (d) => !d?.hasMore || !d?.nextId,
    },
  );

  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('notification--Chat', props.prefixCls);
  return (
    <div className={prefixCls}>
      <div className={classnames('left', { ['hidden']: openUserList })}>
        <UserHeader className={classnames('userHeader')} />
        <div ref={ref} className={'userList'}>
          <List
            locale={{ emptyText: '暂无联系人' } as any}
            rowKey='id'
            itemLayout='horizontal'
            dataSource={data?.list || []}
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
          {loading && <Loading />}
        </div>
      </div>
      <div className={'right'}>
        <Button
          className={'toggle'}
          type={'link'}
          icon={
            openUserList ? <StepForwardOutlined /> : <StepBackwardOutlined />
          }
          onClick={toggle}
        />
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
          <Empty />
        )}
      </div>
    </div>
  );
};
