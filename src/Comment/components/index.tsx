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
import {
  useEventEmitter,
  useUpdateEffect,
  useRequest,
  useSetState,
  useToggle, useInfiniteScroll,
} from 'ahooks';
import Comment from './Comment';
import { AffixEditor } from './Editor';
import { Loading, Utils } from '@hocgin/ui';
import Lang from '@/Utils/lang';
import { Struct } from '@/Utils/result';

export interface IndexProps {
  /**
   * 设置样式名
   */
  className?: string;
  total?: number;
  useAction: UseAction;
}

const Index: React.FC<IndexProps> = ({ useAction, total }) => {
  let [orderDesc, { toggle: toggleOrderDesc }] = useToggle<boolean>(true);

  // 点击回复事件
  const reply$ = useEventEmitter<CommentType | undefined>();

  // 提交回复事件
  const replied$ = useEventEmitter<CommentType>();

  const { data, loading, reload, mutate } = useInfiniteScroll(
    (d?: any) =>
      Utils.Lang.nilService(useAction?.scroll)({ orderDesc, nextId: d?.nextId }).then(Struct.getScrollData),
    {
      target: document,
      isNoMore: (d) => d?.nextId === undefined,
    },
  );

  replied$.useSubscription((comment: CommentType) => {
    let isReplyCommend = !!comment?.replyId;
    if (isReplyCommend) {
      return;
    }
    data.list = [...data?.list, comment] as CommentType[];
    mutate({ ...data });
  });

  useUpdateEffect(() => reload(), [orderDesc]);

  return (
    <div className={classNames(styles.commentGroup)}>
      <List
        className={styles.comments}
        locale={{ emptyText: '赶快来评论一下吧～' } as any}
        itemLayout='horizontal'
        header={
          <div className={styles.header}>
            <span>{total !== undefined ? `${total} 评论` : '评论'}</span>
            <div>
              <Button
                type='link'
                onClick={toggleOrderDesc}
                disabled={orderDesc}
              >
                倒序↓
              </Button>
              <Divider type='vertical' />
              <Button
                type='link'
                onClick={toggleOrderDesc}
                disabled={!orderDesc}
              >
                正序↑
              </Button>
            </div>
          </div>
        }
        dataSource={data?.list || []}
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
      {loading && <Loading />}
      <AffixEditor reply$={reply$} replied$={replied$} useAction={useAction} />
    </div>
  );
};

export default Index;
