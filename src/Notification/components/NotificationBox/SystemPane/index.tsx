import React, { useRef } from 'react';
import classnames from 'classnames';
import { MessageSmallCard, Title } from '../Common';
import { MessageDataType, UseAction } from '@/Notification/components/types';
import { useInfiniteScroll } from 'ahooks';
import { Loading, Utils } from '@/index';
import { Struct } from '@/Utils/result';
import styles from './index.less';

export const SystemPane: React.FC<{
  className?: string;
  useAction: UseAction;
}> = ({ className, useAction }) => {
  const ref = useRef<any>();
  const { data, loading, loadMore, loadingMore, noMore } = useInfiniteScroll(
    () =>
      Utils.Lang.nilService(useAction?.scrollWithSystemMessage, {})().then(
        Struct.getScrollData,
      ),
    {
      target: ref,
      isNoMore: (d) => d?.nextId === undefined,
    },
  );

  return (
    <div className={styles.component}>
      <Title>系统公告</Title>
      <div ref={ref} className={classnames(styles.container, className)}>
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
        {loading && <Loading />}
      </div>
    </div>
  );
};
