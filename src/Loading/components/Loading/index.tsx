import React from 'react';
import { Spin } from 'antd';
import styles from './index.less';

const Index: React.FC<{
  className?: string;
}> = (props) => {
  return <div className={styles.loading}><Spin delay={300} /></div>;
};

export default Index;
