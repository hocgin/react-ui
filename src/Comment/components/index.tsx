import React from 'react';
import { CommentType, UseAction } from './type';
import classNames from 'classnames';
import { Button, List, Divider } from 'antd';
import {
  useEventEmitter,
  useUpdateEffect,
  useToggle,
  useInfiniteScroll,
} from 'ahooks';
import Comment from './Comment';
import { AffixEditor } from './Editor';
import { Loading, Utils } from '@/index';
import { ConfigContext } from '@/ConfigProvider';

export interface IndexProps {
  /**
   * 设置样式名
   */
  className?: string;
  prefixCls?: string;
  total?: number;
  useAction: UseAction;
}

const Index: React.FC<IndexProps> = ({ useAction, total, ...props }) => {
  let [orderDesc, { toggle: toggleOrderDesc }] = useToggle<boolean>(true);

  // 点击回复事件
  const reply$ = useEventEmitter<CommentType | undefined>();

  // 提交回复事件
  const replied$ = useEventEmitter<CommentType>();

  const { data, loading, reload, mutate } = useInfiniteScroll(
    (d?: any) =>
      Utils.Lang.nilService(useAction?.scroll)({
        orderDesc,
        nextId: d?.nextId,
      }).then(Utils.Struct.getScrollData),
    {
      target: Utils.Lang.isBrowser() ? document : null,
      isNoMore: (d) => !d?.hasMore || !d?.nextId,
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
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('comment-group', props.prefixCls);

  return (
    <div className={classNames(prefixCls)}>
      <List
        className={`${prefixCls}-comments`}
        locale={{ emptyText: '赶快来评论一下吧～' } as any}
        itemLayout="horizontal"
        header={
          <div className={`${prefixCls}-header`}>
            <span>{total !== undefined ? `${total} 评论` : '评论'}</span>
            <div>
              <Button
                type="link"
                onClick={toggleOrderDesc}
                disabled={orderDesc}
              >
                倒序↓
              </Button>
              <Divider type="vertical" />
              <Button
                type="link"
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
