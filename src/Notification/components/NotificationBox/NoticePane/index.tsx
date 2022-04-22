import React, { useRef, useState } from 'react';

import { Title, MessageSmallCard } from '../Common';
import classnames from 'classnames';
import { MessageDataType, UseAction } from '@/Notification/components/types';
import { useInfiniteScroll } from 'ahooks';
import { Empty, Loading } from '@/index';
import { Utils } from '@/index';
import { Struct } from '@/Utils/result';
import { ConfigContext } from '@/ConfigProvider';

export const NoticePane: React.FC<{
  prefixCls?: string;
  className?: string;
  useAction: UseAction;
}> = ({ className, useAction, ...props }) => {
  const set: string[] = [];
  const ref = useRef<any>();
  const { data, loading, noMore } = useInfiniteScroll(
    (d?: any) =>
      Utils.Lang.nilService(
        useAction?.scrollWithNoticeMessage,
        {},
      )({ nextId: d?.nextId }).then(Struct.getScrollData),
    {
      target: ref,
      isNoMore: (d) => !d?.hasMore || !d?.nextId,
    },
  );
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('notification--NoticePane', props.prefixCls);
  return (
    <div className={classnames(prefixCls, className)}>
      <Title>订阅通知</Title>
      <div ref={ref} className={classnames('container')}>
        {(data?.list || []).map(
          ({ sendAt, title, description, noticeMessage }: MessageDataType) => {
            let ymd: string = Utils?.Format.DateTime.useDefLocalDatetime(
              sendAt,
              Utils?.Format.DateTime.FORMAT_3,
            );
            let needAddDay = !set.includes(ymd);
            if (needAddDay) {
              set.push(ymd);
            }
            return (
              <>
                {needAddDay && <Title>{ymd}</Title>}
                <MessageSmallCard
                  title={`${title}`}
                  description={description}
                  content={`${noticeMessage?.content}`}
                  datetime={sendAt}
                />
              </>
            );
          },
        )}
        {noMore && (data?.list || []).length === 0 && <Empty />}
        {loading && <Loading />}
      </div>
    </div>
  );
};
