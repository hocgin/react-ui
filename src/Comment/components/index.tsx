import React, { useState } from 'react';
import {
  CommentType,
  ScrollDataType,
  ScrollParamsType,
  UseAction,
} from './type';
import classNames from 'classnames';
import styles from './index.less';
import InfiniteScroll from 'react-infinite-scroller';
import { Button, List, Divider } from 'antd';
import { useEventEmitter, useUpdateEffect, useRequest, useSetState, useToggle } from 'ahooks';
import Comment, { AffixEditor } from './Comment';
import { Loading } from '@hocgin/ui';

export interface IndexProps {
  /**
   * 设置样式名
   */
  className?: string;
  total?: number;
  useAction: UseAction;
}

const Index: React.FC<IndexProps> = ({ useAction, total }) => {
  let [dataSource, setDataSource] = useState([] as CommentType[]);
  let [hasMore, setHasMore] = useState(true);
  let [orderDesc, { toggle: toggleOrderDesc }] = useToggle<boolean>(true);
  let [defaultParams, setDefaultParams] = useSetState({});

  // 点击回复事件
  const reply$ = useEventEmitter<CommentType | undefined>();

  // 提交回复事件
  const replied$ = useEventEmitter<CommentType>();

  replied$.useSubscription((comment: CommentType) => {
    let isReplyCommend = !!comment?.replyId;
    if (isReplyCommend) {
      return;
    }
    setDataSource([...dataSource, comment] as CommentType[]);
  });

  // 请求
  let scrollPull = useRequest<ScrollDataType, [ScrollParamsType]>(
    useAction!.scroll,
    {
      manual: true,
      onSuccess: (data: ScrollDataType) => {
        let hasMore: boolean = data?.hasMore || false;
        let records: CommentType[] = data?.records || [];
        let nextId = data?.nextId;

        setDefaultParams({ nextId: nextId });
        setDataSource([...dataSource, ...records] as CommentType[]);
        setHasMore(hasMore);
      },
    },
  );
  useUpdateEffect(() => {
    setDataSource([]);
    setDefaultParams({ nextId: null });
    setHasMore(true);
  }, [orderDesc]);

  let onLoadMore = (page = 1) => {
    scrollPull.run({ ...defaultParams, orderDesc, page } as ScrollParamsType);
  };

  return (
    <div className={classNames(styles.commentGroup)}>
      <InfiniteScroll key={`${orderDesc}`}
                      initialLoad={true}
                      pageStart={0}
                      loadMore={onLoadMore}
                      hasMore={!scrollPull.loading && hasMore}
                      useWindow={true}>
        <List
          className={styles.comments}
          locale={{ emptyText: '赶快来评论一下吧～' } as any}
          itemLayout='horizontal'
          header={<div className={styles.header}>
            <span>{total !== undefined ? `${total} 评论` : '评论'}</span>
            <div>
              <Button type='link' onClick={toggleOrderDesc} disabled={orderDesc}>倒序↓</Button>
              <Divider type='vertical' />
              <Button type='link' onClick={toggleOrderDesc} disabled={!orderDesc}>正序↑</Button>
            </div>
          </div>}
          dataSource={dataSource}
          renderItem={(item: CommentType, index) => (
            <List.Item key={index}>
              <Comment
                reply$={reply$}
                replied$={replied$}
                comment={item}
                useAction={useAction}
                initialLoad={index < 3}
              />
            </List.Item>
          )}
        />
        {scrollPull?.loading && <Loading />}
      </InfiniteScroll>
      <AffixEditor reply$={reply$} replied$={replied$} useAction={useAction} />
    </div>
  );
};

export default Index;
