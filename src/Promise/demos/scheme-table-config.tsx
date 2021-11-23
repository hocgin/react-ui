import React from 'react';
import { TableDropdown } from '@ant-design/pro-table';
import { Space } from 'antd';
import { config as addConfig } from './scheme-archive-config';
import { config as viewConfig } from './scheme-exhibit-config';
import { Promise } from '@hocgin/ui';

export const config: any = {
  action: 'https://api-dev.hocgin.top/api/mina/mobile-wallpaper/_paging',
  title: '高级表格',
  pagination: {
    pageSize: 10,
  },
  columns: [
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '图片',
      dataIndex: 'fullUrl',
      valueType: 'image',
    },
    {
      title: '开始时间',
      dataIndex: 'startAt',
      valueType: 'date',
      hideInTable: true,
    },
    {
      title: '结束时间',
      dataIndex: 'endAt',
      valueType: 'dateTime',
      hideInTable: true,
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text: any, record: any, _: any, action: any) => [
        <Promise.ExhibitSchemaConfig
          config={{
            ...viewConfig,
            trigger: (
              <a key='view' rel='noopener noreferrer'>
                详情
              </a>
            ),
          }}
        />,
        <Promise.ArchiveSchemaConfig
          config={{
            ...addConfig,
            id: record.id,
            trigger: (
              <a key='update' rel='noopener noreferrer'>
                修改
              </a>
            ),
          }}
        />,
        <TableDropdown
          key='actionGroup'
          onSelect={() => action?.reload()}
          menus={[
            {
              key: 'delete',
              name: <Promise.DeleteSchemaConfig action={'/xxsd'} id={[1]} />,
            },
          ]}
        />,
      ],
    },
  ],
  toolBarRender: () => [
    <Promise.ArchiveSchemaConfig config={{ ...addConfig }} />,
  ],
  tableAlertOptionRender: ({ selectedRowKeys }: any) => (
    <Space size={16}>
      <Promise.DeleteSchemaConfig
        action={'/xxsd'}
        id={selectedRowKeys}
        trigger={<a>批量删除</a>}
      />
      <a>导出数据</a>
    </Space>
  ),
};
