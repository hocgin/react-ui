import React, { useState } from 'react';
import { Badge, Tooltip } from 'antd';
import styles from './index.less';
import { BellOutlined } from '@ant-design/icons';

export const NotificationIndicator: React.FC<{
  className?: string;
  count?: number;
  onClick?: () => void;
}> = ({ count, onClick }) => {
  let visible = !!count;
  return <div className={styles.component} onClick={onClick}>
    <Tooltip title={visible ? '有未读的消息' : null}>
      <Badge dot={visible} size='small'><BellOutlined style={{ fontSize: 16 } as any} /></Badge>
    </Tooltip>
  </div>;
};

