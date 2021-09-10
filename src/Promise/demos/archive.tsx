/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Promise, Utils } from '@hocgin/ui';
import styles from './index.less';
import { ArchiveColumn } from '@/Archive/components/interface';

Utils.Config.setBaseServerUrl('https://api-dev.hocgin.top');
Utils.Config.setHeaders({ ['X-Username']: 'hocgin', ['X-Source']: 'react-ui' });

let columns: ArchiveColumn[] = [
  {
    title: '标题',
    key: 'name1',
  },
  {
    title: '标题',
    key: 'name2',
    required: true,
    type: 'input.number',
    rules: [{ required: true, message: '请输入权限名称' }],
  },
];

export default () => {
  return (
    <>
      <Promise.ArchiveModal visible={true} action={'/xx'} columns={columns} />
    </>
  );
};
