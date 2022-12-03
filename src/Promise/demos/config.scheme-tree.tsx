import React from 'react';
import { Space } from 'antd';
import { config as addConfig } from './config.scheme-archive';
import { Promise } from '@hocgin/ui';
import data from './config.tree-data';

/// <reference types="react" />
export const config: any = {
  useAction: {
    tree: async (params: any) => {
      console.log('刷新', params);
      return data;
    },
  },
  title: '树',
  columns: [{
    title: '开始时间',
    dataIndex: 'startAt',
    valueType: 'date',
    hideInTable: true,
  }, {
    title: '结束时间',
    dataIndex: 'endAt',
    valueType: 'dateTime',
    hideInTable: true,
  }],
  toolBarRender: () => [
    <Promise.ArchiveSchemaConfig
      key={'scheme-table-config.tsx@toolBarRender'}
      config={addConfig}
    />,
  ],
  tableAlertOptionRender: (node: any) => {
    console.log('selectedRowKeys', node);
    return (<Space size={16}>
      <a>查看详情</a>
      <a>新增节点</a>
      <a>修改节点</a>
      <a>删除节点</a>
      <a>删除子节点</a>
    </Space>);
  },
};
