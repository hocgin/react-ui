import React, { useRef } from 'react';
import classnames from 'classnames';
import { MessageSmallCard } from '../Common';
import { MessageDataType, UseAction } from '@/Notification/components/types';
import { useInfiniteScroll } from 'ahooks';
import { Utils } from '@/index';

export const SystemPane: React.FC<{
  className?: string;
  useAction: UseAction;
}> = ({ className, useAction }) => {
  const ref = useRef<any>();
  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    Utils.Lang.nilService(useAction?.scrollWithSystemMessage, {}),
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
    },
  );

  return <div ref={ref} className={classnames(className)}>
    {(data?.records || []).map(({ title, description, systemMessage, sendAt }: MessageDataType) =>
      <MessageSmallCard title={`${title}`} description={`${description}`} content={`${systemMessage?.content}`}
                        datetime={sendAt} />)}
  </div>;
};

