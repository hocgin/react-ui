import React from 'react';
import { Empty as AntdEmpty } from 'antd';
import styles from './index.less';

export const Empty: React.FC<{
  className?: string;
  type?: 'normal';
  description?: string;
}> = ({ description = '' }) => {
  return <div className={styles.component}>
    <AntdEmpty description={description} />
  </div>;
};

