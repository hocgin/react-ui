import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { Affix, Avatar, Button, Tooltip } from 'antd';
import {
  CheckOutlined,
  ClearOutlined,
  RetweetOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  CommentType,
  ReplyDataType,
  ReplyParamsType,
  UseAction,
  UserDataType,
} from '../type';
import { useInterval, useMount, useRequest } from 'ahooks';
import { default as GEditor } from '@/Editor';
import Utils from '@/Utils';
import classnames from 'classnames';
import { ConfigContext } from '@/ConfigProvider';

export const AffixEditor: React.FC<{
  reply$: EventEmitter<CommentType | undefined>;
  replied$: EventEmitter<CommentType>;
  useAction: UseAction;
  useAffix?: Boolean;
}> = ({ useAffix, reply$, replied$, useAction }) => {
  let [offsetBottom, setOffsetBottom] = useState<0 | undefined>(undefined);
  reply$.useSubscription((comment?: CommentType) => setOffsetBottom(!!comment ? 0 : undefined));
  return (
    <div>
      <Affix offsetBottom={useAffix ? offsetBottom : undefined}>
        <Editor reply$={reply$} replied$={replied$} useAction={useAction} />
      </Affix>
    </div>
  );
};

const Editor: React.FC<{
  reply$: EventEmitter<CommentType | undefined>;
  replied$: EventEmitter<CommentType>;
  placeholder?: string;
  prefixCls?: string;
  useAction: UseAction;
}> = (props) => {
  let {
    useAction,
    placeholder = '用尊重、理性、友好的讨论，打破彼此的信息茧房～',
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

  // 是否登陆状态
  let landed = !!user;

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
    if (`${content}`.trim().length === 0) {
      return;
    }

    replyRequest.run({
      commentId: reply?.id,
      content,
    } as ReplyParamsType);
    reply$.emit(undefined);
  };

  useMount(() => {
    userRequest.run({ force: false });
  });

  let hasBeReply = reply !== undefined;
  let replyUsername = reply?.author?.title;
  let replyId = reply?.id;

  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('comment-editor', props.prefixCls);
  return (
    <div className={classNames(prefixCls, {})}>
      <div className={`${prefixCls}-author`}>
        <Avatar
          // shape={'square'}
          size={35}
          icon={<UserOutlined />}
          src={user?.avatarUrl}
        />
      </div>
      <div className={classnames(`${prefixCls}-bottom`)}>
        <div className={`${prefixCls}-content`}>
          <GEditor
            editorRef={editorRef}
            placeholder={placeholder}
            className={classnames(`${prefixCls}-bottom-content`, {
              [`${prefixCls}-bottom-content-mask`]: !landed,
            })}
            onChange={() => setContent(editorRef.current.getHTML())}
          />
          {landed ? (
            <></>
          ) : (
            <div className={`${prefixCls}-mask`}>
              点击{' '}
              <a
                rel='noopener noreferrer'
                onClick={() => !landed && userRequest.runAsync({ force: true })}
              >
                登陆
              </a>{' '}
              后参与讨论~ 🕶️
            </div>
          )}
        </div>
        <div className={`${prefixCls}-footer`}>
          <Button
            disabled={!landed}
            className={`${prefixCls}-footer-replyButton`}
            onClick={onSubmitReply}
          >
            {replied ? (
              <>
                <CheckOutlined style={{ color: '#00B06D' } as any} /> 评论成功
              </>
            ) : (
              <>评论</>
            )}
          </Button>
          <div className={`${prefixCls}-reply-item`}>
            {hasBeReply && (
              <>
                <a
                  href={`#c_${replyId}`}
                  className={`${prefixCls}-bottom-reply`}
                >
                  <RetweetOutlined />
                  &nbsp;@{replyUsername}
                </a>
                &nbsp;
                <Tooltip title='取消回复'>
                  <Button
                    size='small'
                    shape='circle'
                    icon={<ClearOutlined size={8} />}
                    onClick={() => {
                      reply$.emit(undefined);
                      setReply(undefined);
                    }}
                  />
                </Tooltip>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
