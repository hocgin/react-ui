import React, { useState } from 'react';
import { Tabs, Badge } from 'antd';
import { NoticePane } from './NoticePane';
import { PersonalPane } from './PersonalPane';
import { SystemPane } from './SystemPane';
import { MessageStat, UseAction } from '../types';
import classnames from 'classnames';
import Utils from '@/Utils';
import { useMount, useRequest } from 'ahooks';

import { ConfigContext } from '@/ConfigProvider';

type MessageType = 'notice' | 'personal' | 'system';
export const NotificationBox: React.FC<{
  prefixCls?: string;
  className?: string;
  unready?: MessageType[];
  defaultActiveKey?: MessageType;
  tabPosition?: 'left' | 'right' | 'top' | 'bottom';
  type?: 'card' | 'line';
  useAction: UseAction;
}> = ({
        defaultActiveKey = 'system',
        useAction,
        tabPosition,
        type,
        ...props
      }) => {
  let [unready, setUnready] = useState<MessageType[] | undefined>(
    props?.unready,
  );

  let statRequest = useRequest(Utils.Lang.nilService(useAction?.stat, {}), {
    manual: true,
    onSuccess: (data?: MessageStat) => {
      let unready: MessageType[] = [];
      !!Utils.Lang.asLong(data?.unreadNoticeCount) && unready.push('notice');
      !!Utils.Lang.asLong(data?.unreadPersonCount) && unready.push('personal');
      !!Utils.Lang.asLong(data?.unreadSystemCount) && unready.push('system');
      setUnready(unready);
    },
  });

  useMount(() => !unready && statRequest.runAsync());
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('notification', props.prefixCls);

  return (
    <Tabs
      tabPosition={tabPosition}
      defaultActiveKey={defaultActiveKey}
      className={prefixCls}
      type={type}
    >
      <Tabs.TabPane
        tab={<Badge dot={(unready || []).includes('system')}>📢 公告</Badge>}
        key='system'
        className={'tabPane'}
      >
        <SystemPane useAction={useAction} />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<Badge dot={(unready || []).includes('personal')}>📪 私信</Badge>}
        key='personal'
        className={classnames('tabPane', 'personalPane')}
      >
        <PersonalPane useAction={useAction} />
      </Tabs.TabPane>
      <Tabs.TabPane
        tab={<Badge dot={(unready || []).includes('notice')}>🎉 通知</Badge>}
        key='notice'
        className={'tabPane'}
      >
        <NoticePane useAction={useAction} />
      </Tabs.TabPane>
    </Tabs>
  );
};
