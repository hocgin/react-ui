/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React, { useState } from 'react';
import { NotificationBox, NotificationIndicator } from '@hocgin/ui';
import styles from './index.less';
import { Divider } from 'antd';

export default () => {
  let [count, setCount] = useState<number>(0);

  return (
    <>
      <Divider type='horizontal' />
      <NotificationIndicator count={count} onClick={() => setCount(Math.round(Math.random() * 10))}
                             className={styles.ok} />
      <Divider type='horizontal' />
      <NotificationBox />
    </>
  );
};
