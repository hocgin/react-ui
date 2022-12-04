import React, { useState } from 'react';
import { LangKit } from '@/_utils';
import Notification from '@/Notification';
import useAction from './use_action';
import { useMount, useRequest, useTimeout } from 'ahooks';
import { MessageStat } from '@/Notification/components/types';

export const NotificationBox: React.FC<{}> = () => {
  return <Notification.Box useAction={useAction()} />;
};

export const NotificationIndicator: React.FC<{ timeout?: number }> = ({
                                                                        timeout = -1,
                                                                      }) => {
  let [count, setCount] = useState<number | undefined>();
  let statRequest = useRequest(LangKit.nilService(useAction()?.stat, {}), {
    manual: true,
    onSuccess: (data: MessageStat) => setCount(data.unreadTotalCount),
  });
  useMount(() => statRequest?.runAsync?.());

  if (timeout > 0) {
    useTimeout(() => statRequest?.runAsync?.(), timeout);
  }

  return <Notification.Indicator count={count} />;
};
