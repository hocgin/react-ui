import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import styles from './index.less';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { Avatar, Button, Tooltip } from 'antd';
import { CheckOutlined, ClearOutlined, UserOutlined } from '@ant-design/icons';
import {
  CommentType,
  ReplyDataType,
  ReplyParamsType,
  UseAction,
  UserDataType,
} from '../type';
import { useInterval, useMount, useRequest } from 'ahooks';
import { Editor as GEditor, Utils } from '@hocgin/ui';

const Editor: React.FC<{
  reply$: EventEmitter<CommentType | undefined>;
  replied$: EventEmitter<CommentType>;
  placeholder?: string;
  useAction: UseAction;
}> = (props) => {
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
  let editorRef = useRef<any>();

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

  let mentionUserRequest = useRequest<UserDataType[], any>(
    Utils.Lang.nilService(useAction.mentionUser, []),
    {
      manual: true,
      retryCount: 3,
      debounceWait: 300,
      onSuccess: (data?: UserDataType[]) => setMentionUser(data || []),
    },
  );

  let replyRequest = useRequest(useAction.reply, {
    manual: true,
    retryCount: 3,
    debounceWait: 300,
    onSuccess: (data: ReplyDataType) => {
      replied$.emit(data);

      // 清除原先内容
      editorRef?.current?.clearContent();
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

  useMount(() => {
    userRequest.run(false);
  });

  let userName = user?.title;
  let hasBeReply = reply !== undefined;

  let replyUsername = reply?.author?.title;
  let replyId = reply?.id;

  return (
    <div className={classNames(styles.editor)}>
      <div className={styles.right}>
        <div className={styles.header}>
          <Avatar size={35} icon={<UserOutlined />} src={user?.avatarUrl} />
          <span
            className={styles.title}
            onClick={() => !user && userRequest.runAsync(true)}
          >
            {userName ?? '点击登陆'}
          </span>
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
        <div style={{ margin: '3px 0' } as any}>
          <GEditor
            editorRef={editorRef}
            className={styles.content}
            onChange={() => setContent(editorRef.current.getHTML())}
          />
        </div>
        <div className={styles.replyButton}>
          <Button disabled={!landed} onClick={onSubmitReply}>
            {replied ? (
              <>
                <CheckOutlined style={{ color: '#00B06D' } as any} /> 评论成功
              </>
            ) : (
              '评论'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Editor;
