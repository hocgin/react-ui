/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Promise } from '@hocgin/ui';
import styles from './index.less';


export default () => {
  return <div style={{ height: '100vh' } as any}>
    <Promise.ViewEditorPage title='2022 文稿' className={styles.ok} />
  </div>;
};
