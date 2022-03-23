import React, { useRef, useState } from 'react';
import styles from './index.less';
import { Title, MessageSmallCard } from '../Common';
import classnames from 'classnames';
import { MessageDataType, UseAction } from '@/Notification/components/types';
import { useInfiniteScroll, useSet } from 'ahooks';
import { Format } from '@hocgin/ui';
import { Utils } from '@/index';

export const NoticePane: React.FC<{
  className?: string;
  useAction: UseAction;
}> = ({ className, useAction }) => {
  const set: string[] = [];
  const ref = useRef<any>();
  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    Utils.Lang.nilService(useAction?.scrollWithNoticeMessage, {}),
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
    },
  );
  return <div ref={ref} className={classnames(styles.component, className)}>
    {(data?.records || []).map(({ sendAt, title, description, noticeMessage }: MessageDataType) => {
      let ymd: string = Format.DateTime.useDefLocalDatetime(sendAt, Format.DateTime.FORMAT_3);
      let needAddDay = !set.includes(ymd);
      if (needAddDay) {
        set.push(ymd);
      }
      return <>
        {needAddDay && <Title>{ymd}</Title>}
        <MessageSmallCard title={`${title}`} description={description} content={`${noticeMessage?.content}`}
                          datetime={sendAt} />
      </>;
    })}
  </div>;
};

