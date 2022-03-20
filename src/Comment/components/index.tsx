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
import { List } from 'antd';
import { useEventEmitter, useRequest, useSetState } from 'ahooks';
import Comment, { AffixEditor } from './Comment';

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

  let onLoadMore = (page = 1) => {
    scrollPull.run({ ...defaultParams, page } as ScrollParamsType);
  };

  return (
    <div className={classNames(styles.commentGroup)}>
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={onLoadMore}
        hasMore={!scrollPull.loading && hasMore}
        useWindow={true}
      >
        <List
          className={styles.comments}
          loading={scrollPull?.loading}
          locale={{ emptyText: '赶快来评论一下吧～' } as any}
          itemLayout='horizontal'
          header={<span className={styles.header}>{total !== undefined ? `${total} 评论` : '评论'}</span>}
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
      </InfiniteScroll>
      <AffixEditor reply$={reply$} replied$={replied$} useAction={useAction} />
    </div>
  );
};

export default Index;
