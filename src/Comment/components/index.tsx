import React, { useEffect, useRef, useState } from 'react';
import { CommentType, UseAction } from './type';
import classNames from 'classnames';
import { Button, List, Divider, Segmented } from 'antd';
import {
  useEventEmitter,
  useUpdateEffect,
  useToggle,
  useInfiniteScroll,
  useInViewport,
} from 'ahooks';
import Comment from './Comment';
import { AffixEditor } from './Editor';
import { Loading, Utils } from '@/index';
import { ConfigContext } from '@/ConfigProvider';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

export interface IndexProps {
  /**
   * 设置样式名
   */
  className?: string;
  prefixCls?: string;
  total?: number;
  key?: string;
  useAction: UseAction;
}

let GoToComment: React.FC<{
  href: string;
  visible?: boolean;
  className?: string;
}> = ({ className, href, visible = false }) => {
  return (
    <a
      href={href}
      className={className}
      style={{ display: visible ? 'inline-block' : 'none' } as any}
    >
      <div className={`${className}-icon`}>评论</div>
    </a>
  );
};

const Index: React.FC<IndexProps> = ({
                                       key = 'hui-comment',
                                       useAction,
                                       total,
                                       ...props
                                     }) => {
  let [orderDesc, { set: setOrderDesc }] = useToggle<boolean>(true);
  let [showType, setShowType] = useState<'list' | 'kanban'>('list');

  const ref = useRef<any>();
  const [inViewport] = useInViewport(ref);

  // 点击回复事件
  const reply$ = useEventEmitter<CommentType | undefined>();

  // 提交回复事件
  const replied$ = useEventEmitter<CommentType>();

  const { data, loading, reload, mutate } = useInfiniteScroll(
    (d?: any) =>
      Utils.Lang.nilService(useAction?.scroll)({
        orderDesc,
        showType,
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

  useUpdateEffect(() => reload(), [orderDesc, showType]);
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('comment-group', props.prefixCls);

  const [targetOffset, setTargetOffset] = useState<number | undefined>(
    undefined,
  );
  useEffect(() => {
    setTargetOffset(window.innerHeight / 4);
  }, []);

  let isListModal = showType === 'list';
  return (
    <>
      <div id={`${key}`} ref={ref} className={classNames(prefixCls)}>
        <List
          className={`${prefixCls}-comments`}
          locale={{ emptyText: '赶快来评论一下吧～' } as any}
          itemLayout='horizontal'
          header={
            <div className={`${prefixCls}-header`}>
              <span>{total !== undefined ? `${total} 评论` : '评论'}</span>
              <div>
                <Button onClick={() => setShowType(isListModal ? 'kanban' : 'list')}
                        icon={isListModal ? <BarsOutlined /> : <AppstoreOutlined />} />
                <Segmented className={`${prefixCls}-order`} onChange={(order: any) => setOrderDesc(order === 'desc')}
                           options={[{
                             label: '正序',
                             value: 'asc',
                           }, {
                             label: '倒序',
                             value: 'desc',
                           }]} />
              </div>
            </div>
          }
          dataSource={data?.list || []}
          renderItem={(item: CommentType, index) => (
            <List.Item key={index}>
              <Comment
                hasLoadChild={!isListModal}
                reply$={reply$}
                replied$={replied$}
                comment={item}
                hasUserOptions={true}
                useAction={useAction}
                initialLoad={index < 3}
              />
            </List.Item>
          )}
        />
        {loading && <Loading />}
        <AffixEditor
          useAffix={inViewport}
          reply$={reply$}
          replied$={replied$}
          useAction={useAction}
        />
        <GoToComment
          className={`${prefixCls}-goto`}
          href={`#${key}`}
          visible={!inViewport}
        />
      </div>
    </>
  );
};

export default Index;
