import React, { useState, useRef, createElement, useEffect } from 'react';
import { Utils, Editor as GEditor } from '@/index';
import { useRequest, useToggle, useSize } from 'ahooks';
import { UserType } from '@/Utils/interface';
import {
  CommentType,
  DislikeDataType,
  LikeDataType,
  PagingDataType,
  PagingParamsType,
  UseAction,
} from '../type';
import {
  LikeFilled,
  LikeOutlined,
  MoreOutlined,
  RetweetOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Comment,
  Tooltip,
  List,
  Pagination,
  Dropdown,
  Skeleton,
  Button,
  Menu,
  Tag,
} from 'antd';
import { ID } from '@/Utils/interface';
import classnames from 'classnames';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import DateTimeFormat from '@/Utils/format/datetime';
import { ConfigContext } from '@/ConfigProvider';
import { ExpandHistoryButton } from '@/Comment/components/History';
import UserAvatar from '@/Comment/components/Comment/UserAvatar';

export const Content: React.FC<{
  prefixCls?: string;
  children?: any;
  expanded?: boolean;
  maxHeight?: number;
}> = ({ children, maxHeight = 100, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('comment', props.prefixCls);
  const ref = useRef<any>();
  const size = useSize(ref);
  let [expanded, { toggle: toggleExpanded }] = useToggle<boolean>(
    props?.expanded ?? false,
  );
  let contentStyle = expanded
    ? {}
    : { maxHeight: `${maxHeight}px`, overflow: 'hidden' };

  return (
    <>
      <div className={`${prefixCls}-content`} style={contentStyle}>
        <div ref={ref}>
          <GEditor
            contentClassName={`${prefixCls}-content-editorContent`}
            value={children}
            editable={false}
          />
        </div>
      </div>
      {(size?.height ?? 0) > maxHeight && (
        <a
          rel='noopener noreferrer'
          className={`${prefixCls}-expanded`}
          onClick={toggleExpanded}
        >
          {expanded ? '收起' : '展开'}
        </a>
      )}
    </>
  );
};

const UserOptions: React.FC<{
  reply$?: EventEmitter<CommentType | undefined>;
  comment: CommentType;
  useAction: UseAction;
  userAction?: string;
  prefixCls?: string;
}> = (props) => {
  let { useAction, comment } = props;
  let [userAction, setUserAction] = useState(props?.userAction);
  let [likesCount, setLikesCount] = useState(comment?.likes || 0);
  let [dislikedCount, setDislikedCount] = useState(comment?.disliked || 0);

  let commentId = comment.id;
  let options = {
    manual: true,
    defaultParams: { commentId } as any,
    onSuccess: ({
                  likes = 0,
                  disliked = 0,
                  action,
                }: DislikeDataType | LikeDataType) => {
      setLikesCount(likes);
      setDislikedCount(disliked);
      setUserAction(action);
    },
  };

  let likeRequest = useRequest(useAction.like, options);
  let dislikeRequest = useRequest(useAction.dislike, options);
  let onAction = (type: 'like' | 'dislike', commentId: ID) => {
    if (type === 'like') {
      likeRequest.run({ commentId });
    } else {
      dislikeRequest.run({ commentId });
    }
  };
  let onClickReply = () => {
    props.reply$?.emit(comment);
  };

  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('comment', props.prefixCls);
  return (
    <>
      <span onClick={onClickReply}>回复</span>
      <Tooltip title='Like'>
        <span onClick={onAction.bind(this, 'like', commentId)}>
          {createElement(userAction === 'like' ? LikeFilled : LikeOutlined)}
          <span className={`${prefixCls}-commentAction`}>{likesCount}</span>
        </span>
      </Tooltip>
      {/*<Tooltip title="Dislike">*/}
      {/*  <span onClick={onAction.bind(this, 'dislike', commentId)}>*/}
      {/*    {React.createElement(*/}
      {/*      userAction === 'dislike' ? DislikeFilled : DislikeOutlined,*/}
      {/*    )}*/}
      {/*    <span className={`${prefixCls}-commentAction`}>{dislikedCount}</span>*/}
      {/*  </span>*/}
      {/*</Tooltip>*/}
    </>
  );
};

const SubComment: React.FC<{
  reply$?: EventEmitter<CommentType | undefined>;
  hasHistory?: boolean;
  comment: CommentType;
  useAction: UseAction;
}> = (props) => {
  let { comment, hasHistory, useAction, reply$ } = props;
  let {
    author,
    replier,
    content,
    replyId,
    datetime,
    idx,
    isCommenter,
    isInitiator,
    action: userAction,
  } = comment;
  let id = comment.id;
  return (
    <CiComment
      type={'small'}
      id={id}
      idx={idx}
      history={
        hasHistory ? (
          <ExpandHistoryButton useAction={useAction} id={id} />
        ) : null
      }
      isCommenter={isCommenter}
      isInitiator={isInitiator}
      replyId={replyId}
      author={author}
      replier={replier}
      datetime={datetime}
      content={<Content>{content}</Content>}
      actions={[
        <UserOptions
          reply$={reply$}
          useAction={useAction}
          userAction={userAction}
          comment={comment}
        />,
      ]}
    />
  );
};

export const CiComment: React.FC<{
  prefixCls?: string;
  id: ID;
  replyId?: ID | null;
  datetime?: string;
  content?: React.ReactNode;
  author: UserType;
  replier?: UserType | null;
  type?: 'small' | 'none';
  className?: string;
  active?: boolean;
  isCommenter?: boolean;
  isInitiator?: boolean;
  children?: any;
  idx?: number;
  history?: React.ReactNode;
  actions?: React.ReactNode[];
}> = ({
        id,
        type = 'none',
        active = false,
        datetime,
        content,
        replyId,
        author,
        replier,
        children,
        history,
        actions = [],
        className,
        idx,
        isCommenter,
        isInitiator,
        ...props
      }) => {
  let hasReply = replyId && replier;
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('comment', props.prefixCls);
  return (
    <div
      id={`c_${id}`}
      className={classnames(
        `${prefixCls}`,
        {
          [`${prefixCls}-small`]: type === 'small',
          [`${prefixCls}-activeComment`]: active,
        },
        className,
      )}
    >
      <Comment
        avatar={
          <UserAvatar isInitiator={isInitiator}
                      isCommenter={isCommenter} src={author?.avatarUrl} size={35}
                      icon={<UserOutlined />} />
        }
        author={
          <div className={`${prefixCls}-tiptap`}>
            <div className={`${prefixCls}-author`}>
              <span className={`${prefixCls}-author-title`}>
                {author?.title}
              </span>
              {hasReply && (
                <a
                  href={`#c_${replyId || ''}`}
                  className={`${prefixCls}-reply`}
                  onClick={() => {
                    // onJump && onJump(replyId);
                  }}
                >
                  <RetweetOutlined className={`${prefixCls}-replyFlag`} />
                  <Avatar
                    size={18}
                    src={replier?.avatarUrl}
                    className={`${prefixCls}-replyAvatar`}
                  />
                  <span className={`${prefixCls}-author-title`}>
                    {replier?.title}
                  </span>
                </a>
              )}
            </div>
            <div className={`${prefixCls}-datetime`}>
              <span>{DateTimeFormat.useDefRelativeFromNow(datetime)}</span>
            </div>
          </div>
        }
        content={content}
        actions={actions}
        datetime={
          <div>
            {idx && <span>#{idx}</span>}
            {history}
            <Dropdown
              overlay={
                <Menu disabled items={[{ label: '举报', key: 'jubao' }]} />
              }
            >
              <Button
                size={'small'}
                ghost
                type='link'
                icon={<MoreOutlined />}
              />
            </Dropdown>
          </div>
        }
      >
        {children}
      </Comment>
    </div>
  );
};

const Index: React.FC<{
  prefixCls?: string;
  hasLoadChild: boolean;
  reply$?: EventEmitter<CommentType | undefined>;
  replied$?: EventEmitter<CommentType>;
  initialLoad: boolean;
  hasHistory?: boolean;
  hasUserOptions?: boolean;
  comment: CommentType;
  useAction: UseAction;
}> = (props, ref) => {
  let {
    comment,
    hasUserOptions,
    hasLoadChild,
    useAction,
    initialLoad,
    reply$,
    replied$,
  } = props;
  let { author, idx, replier, replyId, datetime, action: userAction } = comment;
  let id = comment.id;
  let hasReply = comment.hasReply;
  let content = comment?.content;
  let defaultParams: any = {
    parentId: id,
  };

  let [dataSource, setDataSource] = useState([] as CommentType[]);
  let [total, setTotal] = useState(0);
  let [current, setCurrent] = useState(0);

  replied$?.useSubscription((comment: CommentType) => {
    let replyId = comment?.replyId;
    let isReplyCommend = !!replyId;
    if (!isReplyCommend || replyId !== id) {
      return;
    }
    setDataSource([...dataSource, comment] as CommentType[]);
  });

  let { loading, run } = useRequest<PagingDataType, [PagingParamsType]>(
    useAction.paging,
    {
      defaultParams,
      manual: true,
      retryCount: 3,
      debounceWait: 300,
      onSuccess: (data: PagingDataType) => {
        let tableData = Utils.Struct.getTableData(data);
        let pagination = tableData?.pagination;
        let total: number = pagination?.total || 0;
        let current: number = pagination?.current || 0;
        let records: CommentType[] = tableData?.list || [];

        setCurrent(current);
        setTotal(total);
        setDataSource([...records] as CommentType[]);
      },
    },
  );
  let hasHistory = props?.hasHistory ?? !!useAction.history;

  useEffect(() => {
    if (hasLoadChild && hasReply && initialLoad) {
      run({ ...defaultParams, page: 1 } as PagingParamsType);
    } else {
      setCurrent(0);
      setTotal(0);
      setDataSource([]);
    }
  }, [hasLoadChild]);

  let onPageChange = (page?: number, pageSize?: number) => {
    run({ ...defaultParams, page, size: pageSize });
  };
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('comment', props.prefixCls);
  return (
    <CiComment
      className={prefixCls}
      id={id}
      idx={idx}
      replyId={replyId}
      datetime={datetime}
      author={author}
      replier={replier}
      content={<Content>{content}</Content>}
      history={
        hasHistory ? (
          <ExpandHistoryButton useAction={useAction} id={id} />
        ) : null
      }
      actions={
        hasUserOptions
          ? [
            <UserOptions
              reply$={reply$}
              useAction={useAction}
              userAction={userAction}
              comment={comment}
            />,
          ]
          : []
      }
    >
      {dataSource.length > 0 ? (
        <>
          <List
            loading={loading}
            className={`${prefixCls}-subComments`}
            loadMore={true}
            renderItem={(item: CommentType, index: number) => {
              return (
                <List.Item key={index}>
                  <Skeleton avatar loading={loading} active>
                    <SubComment
                      reply$={reply$}
                      hasHistory={hasHistory}
                      comment={item}
                      useAction={useAction}
                    />
                  </Skeleton>
                </List.Item>
              );
            }}
            itemLayout='horizontal'
            dataSource={dataSource}
          />
          <Pagination
            hideOnSinglePage
            className={`${prefixCls}-pagination`}
            size='small'
            total={total}
            defaultCurrent={1}
            current={current}
            onChange={onPageChange}
            showTotal={(total) => `共 ${total} 条`}
          />
        </>
      ) : null}
    </CiComment>
  );
};

export default Index;
