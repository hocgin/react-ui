import React, { useRef, useState } from 'react';
import styles from './index.less';
import { Title, MessageSmallCard } from '../Common';
import classnames from 'classnames';
import { MessageDataType, UseAction } from '@/Notification/components/types';
import { useInfiniteScroll, useSet } from 'ahooks';
import { Empty, Format, Loading } from '@hocgin/ui';
import { Utils } from '@/index';
import { Struct } from '@/Utils/result';

export const NoticePane: React.FC<{
  className?: string;
  useAction: UseAction;
}> = ({ className, useAction }) => {
  const set: string[] = [];
  const ref = useRef<any>();
  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    (d?: any) =>
      Utils.Lang.nilService(
        useAction?.scrollWithNoticeMessage,
        {},
      )({ nextId: d?.nextId }).then(Struct.getScrollData),
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
    },
  );
  return (
    <div className={classnames(styles.component, className)}>
      <Title>订阅通知</Title>
      <div ref={ref} className={classnames(styles.container)}>
        {(data?.list || []).map(
          ({ sendAt, title, description, noticeMessage }: MessageDataType) => {
            let ymd: string = Format.DateTime.useDefLocalDatetime(
              sendAt,
              Format.DateTime.FORMAT_3,
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
