/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Toolbar } from '@hocgin/ui';
import { Menu } from 'antd';
import styles from './index.less';

export default () => {
  const BatchMenus = [<Menu.Item key='rowsDelete'>批量移出</Menu.Item>];
  return <Toolbar batchMenus={BatchMenus} selectedRows={['1']} />;
};
