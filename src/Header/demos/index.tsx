/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Header } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return (<div style={{ padding: '20px 10px 0' }}><Header
    menus={[{ href: 'www.baidu.com', title: '标题' }, { href: 'www.baidu.com', title: '标题' }]} /></div>);
};
