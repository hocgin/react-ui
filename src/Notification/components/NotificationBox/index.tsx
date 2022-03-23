import React from 'react';
import { Tabs } from 'antd';
import styles from './index.less';
import { NoticePane } from './NoticePane';
import { PersonalPane } from './PersonalPane';
import { SystemPane } from './SystemPane';
import { UseAction } from '../types';
import classnames from 'classnames';

export const NotificationBox: React.FC<{
  className?: string;
  useAction: UseAction;
}> = ({ useAction }) => {
  return <Tabs tabPosition='left' className={styles.tab} type='card'>
    <Tabs.TabPane tab='📪 私信' key='2' className={classnames(styles.tabPane, styles.personalPane)}>
      <PersonalPane useAction={useAction} />
    </Tabs.TabPane>
    <Tabs.TabPane tab='🎉 通知' key='3' className={styles.tabPane}>
      <NoticePane useAction={useAction}/>
    </Tabs.TabPane>
    <Tabs.TabPane tab='📢 公告' key='1' className={styles.tabPane}>
      <SystemPane useAction={useAction} />
    </Tabs.TabPane>
  </Tabs>;
};

