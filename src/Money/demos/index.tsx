/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Money } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return <Money value={10} />;
};
