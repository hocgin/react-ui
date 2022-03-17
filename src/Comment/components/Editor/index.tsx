import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { Avatar, Button, Divider, Popover, Tooltip, Input, Mentions } from 'antd';
import {
  CheckOutlined,
  ClearOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  CommentType,
  ReplyDataType,
  ReplyParamsType,
  UseAction,
  UserDataType,
} from '../type';
// @ts-ignore
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import { useInterval, useMount, useRequest } from 'ahooks';

const { TextArea } = Input;

const Editor: React.FC<{
  reply$: EventEmitter<CommentType | undefined>;
  replied$: EventEmitter<CommentType>;
  placeholder?: string;
  useAction: UseAction;
}> = (props, ref) => {
  let {
    useAction,
    placeholder = '写下尊重、理性、友好的评论，让彼此更友好地交流～',
    reply$,
    replied$,
  } = props;
  let [reply, setReply] = useState<CommentType | undefined>(undefined);
  let [content, setContent] = useState<string | undefined>('');
  let [mentionUser, setMentionUser] = useState<UserDataType[]>([]);
  let [replied, setReplied] = useState(false);
  useInterval(() => setReplied?.(false), 2000);

  reply$.useSubscription((comment?: CommentType) => {
    setReply(comment);
  });

  let [user, setUser] = useState<UserDataType | undefined>(undefined);
  let landed = user !== undefined;

  let userRequest = useRequest<UserDataType, any>(useAction.user, {
    manual: true,
    retryCount: 3,
    debounceWait: 300,
    onSuccess: (data?: UserDataType) => setUser(data as UserDataType),
  });

  let mentionUserRequest = useRequest<UserDataType[], any>(useAction.mentionUser, {
    manual: true,
    retryCount: 3,
    debounceWait: 300,
    onSuccess: (data?: UserDataType[]) => setMentionUser(data || []),
  });

  let replyRequest = useRequest(useAction.reply, {
    manual: true,
    retryCount: 3,
    debounceWait: 300,
    onSuccess: (data: ReplyDataType) => {
      replied$.emit(data);

      // 清除原先内容
      setContent('');
      setReplied(true);
    },
  });

  let onSubmitReply = () => {
    replyRequest.run({
      commentId: reply?.id,
      content,
    } as ReplyParamsType);
    reply$.emit(undefined);
  };

  let onSelectEmoji = (emoji: any) => {
    setContent(content + emoji.native);
  };

  useMount(() => {
    userRequest.run({});
  });

  let userName = user?.title;
  let hasBeReply = reply !== undefined;

  let replyUsername = reply?.author?.title;
  let replyId = reply?.id;

  return (
    <div className={classNames(styles.editor)}>
      <div className={styles.left}>
        <Avatar size={40} icon={<UserOutlined />} src={user?.avatarUrl} />
      </div>
      <div className={styles.right}>
        <div className={styles.header}>
          <span className={styles.title}>{userName} </span>
          {hasBeReply && (
            <>
              <a href={`#c_${replyId}`} className={styles.reply}>
                回复&nbsp;@{replyUsername}
              </a>
              &nbsp;
              <Tooltip title='取消回复'>
                <Button
                  size='small'
                  shape='circle'
                  icon={<ClearOutlined />}
                  onClick={() => setReply(undefined)}
                />
              </Tooltip>
            </>
          )}
        </div>
        <div style={{ margin: '3px 0' } as any}>
          <Mentions loading={mentionUserRequest?.loading} onSearch={(keyword) => mentionUserRequest.run({ keyword })}
                    rows={3}
                    disabled={!landed}
                    value={content}
                    onSelect={console.log}
                    placeholder={landed ? placeholder : `请先进行登陆哈 😄`}
                    onChange={(text) => setContent(text || undefined)}
          >
            {(mentionUser || []).map(({ id, title, avatarUrl }) => (
              <Mentions.Option value={`${title}`}>
                <Avatar src={avatarUrl} alt={title} />
                <span>{title}</span>
              </Mentions.Option>))}
          </Mentions>
        </div>
        <div>
          <Button disabled={!landed} onClick={onSubmitReply}>
            {replied ? (
              <>
                <CheckOutlined style={{ color: '#00B06D' } as any} /> 评论成功
              </>
            ) : (
              '评论'
            )}
          </Button>
          <Divider type='vertical' />
          <div className={styles.emojiBox}>
            <Popover
              placement='top'
              content={<Picker onSelect={onSelectEmoji} />}
              trigger='click'
            >
              <Button size='small' shape='circle' icon={<SmileOutlined />} />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
