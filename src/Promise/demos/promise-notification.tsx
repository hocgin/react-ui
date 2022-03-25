/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React, { useRef } from 'react';
import { Promise } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return (
    <div>
      <h1>提示标记</h1>
      <Promise.NotificationIndicator />
      <h1>展示内容</h1>
      <Promise.NotificationBox />
    </div>
  );
};
