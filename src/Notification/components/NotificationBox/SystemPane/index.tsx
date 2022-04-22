import React, { useRef } from 'react';
import classnames from 'classnames';
import { MessageSmallCard, Title } from '../Common';
import { MessageDataType, UseAction } from '@/Notification/components/types';
import { useInfiniteScroll } from 'ahooks';
import { Empty, Loading, Utils } from '@/index';
import { Struct } from '@/Utils/result';
import { ConfigContext } from '@/ConfigProvider';

export const SystemPane: React.FC<{
  prefixCls?: string;
  className?: string;
  useAction: UseAction;
}> = ({ className, useAction, ...props }) => {
  const ref = useRef<any>();
  const { data, loading, noMore } = useInfiniteScroll(
    (d?: any) =>
      Utils.Lang.nilService(
        useAction?.scrollWithSystemMessage,
        {},
      )({ nextId: d?.nextId }).then(Struct.getScrollData),
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
