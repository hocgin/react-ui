import React, { useState, useRef } from 'react';
import classNames from 'classnames';

import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { Affix, Avatar, Button, Tooltip } from 'antd';
import {
  CheckOutlined,
  ClearOutlined,
  RetweetOutlined,
  UserOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from '@ant-design/icons';
import {
  CommentType,
  ReplyDataType,
  ReplyParamsType,
  UseAction,
  UserDataType,
} from '../type';
import { useInterval, useInViewport, useMount, useRequest, useToggle } from 'ahooks';
import { Editor as GEditor, Utils } from '@/index';
import classnames from 'classnames';
import { ConfigContext } from '@/ConfigProvider';

export const AffixEditor: React.FC<{
  reply$: EventEmitter<CommentType | undefined>;
  replied$: EventEmitter<CommentType>;
  useAction: UseAction;
  useAffix?: Boolean;
}> = ({ useAffix, reply$, replied$, useAction }) => {
  return (
    <div>
      <Affix offsetBottom={useAffix ? 0 : undefined}>
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

  let userName = user?.title;
  let hasBeReply = reply !== undefined;

  let replyUsername = reply?.author?.title;
  let replyId = reply?.id;

  let [expand, { toggle: toggleExpand }] = useToggle<boolean>(false);

  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('comment-editor', props.prefixCls);
  return (
    <div
      className={classNames(prefixCls, {
        [`${prefixCls}-expand`]: expand,
      })}
    >
      <div className={`${prefixCls}-mini`} onClick={toggleExpand}>
        {expand ? <CaretDownOutlined /> : <CaretUpOutlined />}
      </div>
      <div className={classnames(`${prefixCls}-bottom`)}>
        <div className={`${prefixCls}-bottom-header`}>
          <Avatar size={35} icon={<UserOutlined />} src={user?.avatarUrl} />
          <span
            className={`${prefixCls}-bottom-header-title`}
            onClick={() => !user && userRequest.runAsync({ force: true })}
          >
            {userName ?? '点击登陆'}
          </span>
          {hasBeReply && (
            <>
              <a href={`#c_${replyId}`} className={`${prefixCls}-bottom-reply`}>
                <RetweetOutlined />
                &nbsp;@{replyUsername}
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
          <GEditor
            editorRef={editorRef}
            placeholder={placeholder}
            className={`${prefixCls}-bottom-content`}
            onChange={() => setContent(editorRef.current.getHTML())}
          />
        </div>
        <div className={`${prefixCls}-bottom-replyButton`}>
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
