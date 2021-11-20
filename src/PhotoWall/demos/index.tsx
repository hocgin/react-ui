/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Tpl } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return <Tpl title="Demo" className={styles.ok} />;
};