import React, { useState, createElement } from 'react';
import { Utils, Editor as GEditor } from '@hocgin/ui';
import { useMount, useRequest } from 'ahooks';
import { UserType } from '@/Utils/interface';
import {
  CommentType,
  DislikeDataType,
  LikeDataType,
  PagingDataType,
  PagingParamsType,
  UseAction,
} from '../type';
import styles from './index.less';
import {
  DislikeFilled,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  RetweetOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Comment as AntdComment,
  Tooltip,
  List,
  Pagination,
  Skeleton,
  Affix,
} from 'antd';
import { ID } from '@/Utils/interface';
import classnames from 'classnames';
import Editor from '@/Comment/components/Editor';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';

export const AffixEditor: React.FC<{
  reply$: EventEmitter<CommentType | undefined>;
  replied$: EventEmitter<CommentType>;
  useAction: UseAction;
}> = ({ reply$, replied$, useAction }) => {
  return (
    <div className={styles.editor}>
      <Affix offsetBottom={0}>
        <Editor reply$={reply$} replied$={replied$} useAction={useAction} />
      </Affix>
    </div>
  );
};

const UserOptions: React.FC<{
  reply$: EventEmitter<CommentType | undefined>;
  comment: CommentType;
  useAction: UseAction;
  userAction?: string;
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
    props.reply$.emit(comment);
  };

  return (
    <>
      <Tooltip title='Like'>
        <span onClick={onAction.bind(this, 'like', commentId)}>
          {createElement(userAction === 'like' ? LikeFilled : LikeOutlined)}
          <span className={styles.commentAction}>{likesCount}</span>
        </span>
      </Tooltip>
      <Tooltip title='Dislike'>
        <span onClick={onAction.bind(this, 'dislike', commentId)}>
          {React.createElement(
            userAction === 'dislike' ? DislikeFilled : DislikeOutlined,
          )}
          <span className={styles.commentAction}>{dislikedCount}</span>
        </span>
      </Tooltip>
      <span onClick={onClickReply}>回复</span>
    </>
  );
};

const SubComment: React.FC<{
  reply$: EventEmitter<CommentType | undefined>;
  comment: CommentType;
  useAction: UseAction;
}> = (props) => {
  let { comment, useAction, reply$ } = props;
  let {
    author,
    replier,
    content,
    replyId,
    datetime,
    action: userAction,
  } = comment;
  let id = comment.id;
  return (
    <Comment
      type={'small'}
      id={id}
      replyId={replyId}
      author={author}
      replier={replier}
      datetime={datetime}
      content={<div className={styles.content}><GEditor contentClassName={styles.editorContent} editable={false}
                                                        value={content} /></div>}
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

const Comment: React.FC<{
  id: ID;
  replyId?: ID;
  datetime?: string;
  content?: React.ReactNode;
  author: UserType;
  replier?: UserType;
  type?: 'small' | 'none';
  className?: string;
  active?: boolean;
  children?: React.ReactNode;
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
        actions = [],
        className,
      }) => {
  let hasReply = replyId !== undefined;

  return (
    <div
      id={`c_${id}`}
      className={classnames(
        styles.component,
        {
          [styles.small]: type === 'small',
          [styles.activeComment]: active,
        },
        className,
      )}
    >
      <AntdComment
        avatar={
          <Avatar src={author?.avatarUrl} size={32} icon={<UserOutlined />} />
        }
        author={author?.title}
        datetime={
          <>
            {datetime}{' '}
            {hasReply && (
              <a
                href={`#c_${replyId || ''}`}
                className={styles.reply}
                onClick={() => {
                  // onJump && onJump(replyId);
                }}
              >
                <RetweetOutlined />{' '}
                <Avatar size={15} src={replier?.avatarUrl} />{' '}
                <span>{replier?.title}</span>
              </a>
            )}
          </>
        }
        content={content}
        actions={actions}>
        {children}
      </AntdComment>
    </div>
  );
};

const Index: React.FC<{
  reply$: EventEmitter<CommentType | undefined>;
  replied$: EventEmitter<CommentType>;
  initialLoad: boolean;
  comment: CommentType;
  useAction: UseAction;
}> = (props, ref) => {
  let { comment, useAction, initialLoad, reply$, replied$ } = props;
  let { author, replier, replyId, datetime, action: userAction } = comment;
  let id = comment.id;
  let hasReply = comment.hasReply;
  let content = comment?.content;
  let defaultParams: any = {
    parentId: id,
  };

  let [dataSource, setDataSource] = useState([] as CommentType[]);
  let [total, setTotal] = useState(0);
  let [current, setCurrent] = useState(0);

  replied$.useSubscription((comment: CommentType) => {
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

  useMount(() => {
    if (hasReply && initialLoad) {
      run({ ...defaultParams, page: 1 } as PagingParamsType);
    }
  });

  let onPageChange = (page?: number, pageSize?: number) => {
    run({ ...defaultParams, page, size: pageSize });
  };

  return (
    <Comment
      className={styles.comment}
      id={id}
      replyId={replyId}
      datetime={datetime}
      author={author}
      replier={replier}
      content={<div className={styles.content}><GEditor contentClassName={styles.editorContent} value={content}
                                                        editable={false} /></div>}
      actions={[
        <UserOptions
          reply$={reply$}
          useAction={useAction}
          userAction={userAction}
          comment={comment}
        />,
      ]}
    >
      {dataSource.length > 0 ? (
        <>
          <List
            loading={loading}
            className={styles.subComments}
            loadMore={true}
            renderItem={(item: CommentType, index: number) => {
              return (
                <List.Item key={index}>
                  <Skeleton avatar loading={loading} active>
                    <SubComment
                      reply$={reply$}
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
            className={styles.pagination}
            size='small'
            total={total}
            defaultCurrent={1}
            current={current}
            onChange={onPageChange}
            showTotal={(total) => `共 ${total} 条`}
          />
        </>
      ) : null}
    </Comment>
  );
};

export default Index;
