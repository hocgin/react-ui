import React, { useRef } from 'react';
import classnames from 'classnames';
import { MessageSmallCard, Title } from '../Common';
import { MessageDataType, UseAction } from '@/Notification/components/types';
import { useInfiniteScroll } from 'ahooks';
import Empty from '@/Empty';
import Loading from '@/Loading';
import { ConfigContext } from '@/ConfigProvider';
import { StructKit, LangKit } from '@/_utils';

export const SystemPane: React.FC<{
  prefixCls?: string;
  className?: string;
  useAction: UseAction;
}> = ({ className, useAction, ...props }) => {
  const ref = useRef<any>();
  const { data, loading, noMore } = useInfiniteScroll(
    (d?: any) =>
      LangKit.nilService(
        useAction?.scrollWithSystemMessage,
        {},
      )({ nextId: d?.nextId }).then(StructKit.getScrollData),
    {
      target: ref,
      isNoMore: (d) => !d?.hasMore || !d?.nextId,
    },
  );
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('notification--systemPane', props.prefixCls);

  return (
    <div className={prefixCls}>
      <Title>系统公告</Title>
      <div ref={ref} className={classnames('container', className)}>
        {(data?.list || []).map(
          ({ title, description, systemMessage, sendAt }: MessageDataType) => (
            <MessageSmallCard
              title={`${title}`}
              description={`${description}`}
              content={`${systemMessage?.content}`}
              datetime={sendAt}
            />
          ),
        )}
        {noMore && (data?.list || []).length === 0 && <Empty />}
        {loading && <Loading />}
      </div>
    </div>
  );
};
