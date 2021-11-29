import React, { useState } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { Avatar, Button, Divider, Popover, Tooltip, Input } from 'antd';
import { ClearOutlined, SmileOutlined, UserOutlined } from '@ant-design/icons';
import {
  CommentType,
  ReplyDataType,
  ReplyParamsType, UseAction,
  UserDataType,
} from '../type';
// @ts-ignore
import { Picker } from 'emoji-mart';
import { useMount, useRequest } from 'ahooks';

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
  reply$.useSubscription((comment?: CommentType) => {
    setReply(comment);
  });

  let [user, setUser] = useState<UserDataType | undefined>(undefined);
  let landed = user !== undefined;

  let userRequest = useRequest<UserDataType, any>(useAction.user, {
    manual: true,
    retryCount: 3,
    debounceWait: 300,
    onSuccess: (data?: UserDataType) => {
      setUser(data as UserDataType);
    },
  });

  let replyRequest = useRequest(useAction.reply, {
    manual: true,
    retryCount: 3,
    debounceWait: 300,
    onSuccess: (data: ReplyDataType) => {
      replied$.emit(data);
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
          {userName}{' '}
          {hasBeReply && (
            <>
              <a href={`#c_${replyId}`} className={styles.reply}>
                回复&nbsp;@{replyUsername}
              </a>
              &nbsp;
              <Tooltip title="取消回复">
                <Button
                  size="small"
                  shape="circle"
                  icon={<ClearOutlined />}
                  onClick={() => setReply(undefined)}
                />
              </Tooltip>
            </>
          )}
        </div>
        <div>
          <TextArea
            rows={2}
            disabled={!landed}
            bordered={false}
            value={content}
            placeholder={landed ? placeholder : `请先进行登陆哈 😄`}
            onChange={(e) => setContent(e?.target?.value || undefined)}
          />
        </div>
        <div>
          <Button size="small" disabled={!landed} onClick={onSubmitReply}>
            评论
          </Button>
          <Divider type="vertical" />
          <div className={styles.emojiBox}>
            <Popover
              placement="top"
              content={<Picker onSelect={onSelectEmoji} />}
              trigger="click"
            >
              <Button size="small" shape="circle" icon={<SmileOutlined />} />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
