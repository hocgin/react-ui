import React, { useState } from 'react';
import { Tabs, Badge } from 'antd';
import styles from './index.less';
import { NoticePane } from './NoticePane';
import { PersonalPane } from './PersonalPane';
import { SystemPane } from './SystemPane';
import { MessageStat, UseAction } from '../types';
import classnames from 'classnames';
import { Utils } from '@/index';
import { useMount, useRequest } from 'ahooks';

type MessageType = 'notice' | 'personal' | 'system';
export const NotificationBox: React.FC<{
  className?: string;
  unready?: MessageType[]
  defaultActiveKey?: MessageType;
  tabPosition?: 'left' | 'right' | 'top' | 'bottom';
  type?: 'card' | 'line';
  useAction: UseAction;
}> = ({ defaultActiveKey = 'system', useAction, tabPosition, type, ...props }) => {
  let [unready, setUnready] = useState<MessageType[] | undefined>(props?.unready);

  let statRequest = useRequest(Utils.Lang.nilService(useAction?.stat, {}), {
    manual: true,
    onSuccess: (data?: MessageStat) => {
      let unready: MessageType[] = [];
      data?.unreadNoticeCount && unready.push('notice');
      data?.unreadPersonCount && unready.push('personal');
      data?.unreadSystemCount && unready.push('system');
      setUnready(unready);
    },
  });

  useMount(() => !unready && statRequest.runAsync());

  return <Tabs tabPosition={tabPosition} defaultActiveKey={defaultActiveKey} className={styles.tab} type={type}>
    <Tabs.TabPane tab={<Badge dot={(unready || []).includes('system')}>📢 公告</Badge>} key='system'
                  className={styles.tabPane}>
      <SystemPane useAction={useAction} />
    </Tabs.TabPane>
    <Tabs.TabPane tab={<Badge dot={(unready || []).includes('personal')}>📪 私信</Badge>} key='personal'
                  className={classnames(styles.tabPane, styles.personalPane)}>
      <PersonalPane useAction={useAction} />
    </Tabs.TabPane>
    <Tabs.TabPane tab={<Badge dot={(unready || []).includes('notice')}>🎉 通知</Badge>} key='notice'
                  className={styles.tabPane}>
      <NoticePane useAction={useAction} />
    </Tabs.TabPane>
  </Tabs>;
};

