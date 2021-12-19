import React from 'react';
import { TableDropdown } from '@ant-design/pro-table';
import { Space, Divider } from 'antd';
import { config as addConfig } from './scheme-archive-config';
import { config as viewConfig } from './scheme-exhibit-config';
import { Dom, Promise } from '@hocgin/ui';
import data from './table-config';

let deleteConfig = {
  id: [1],
  useAction: {
    delete: async (id: any[]) => {
      console.log('删除2', id);
      return true;
    },
  },
};

/// <reference types="react" />
export const config: any = {
  useAction: {
    paging: async () => {
      console.log('请求', 'scheme-table-config.tsx');
      return data;
    },
  },
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
      render: (text: any, record: any, _: any, action: any) => {
        let id = record.id;
        let viewConfigs = {
          ...viewConfig,
          trigger: (
            <a key='view' rel='noopener noreferrer'>
              详情
            </a>
          ),
        };
        let addConfigs = {
          ...addConfig,
          id: id,
          trigger: (
            <a key='update' rel='noopener noreferrer'>
              修改
            </a>
          ),
        };

        return (
          <div key={id}>
            <Promise.ExhibitSchemaConfig key={1} config={viewConfigs} />
            <Divider key={2} type='vertical' />
            <Promise.ArchiveSchemaConfig
              key={'scheme-table-config.tsx@columns'}
              config={addConfigs}
            />
            <Divider key={4} type='vertical' />
            <TableDropdown
              key='actionGroup'
              onSelect={() => action?.reload()}
              menus={[
                {
                  key: 'delete',
                  name: <Promise.DeleteSchemaConfig config={deleteConfig} />,
                },
              ]}
            />
          </div>
        );
      },
    },
  ],
  toolBarRender: () => [
    <Promise.ArchiveSchemaConfig
      key={'scheme-table-config.tsx@toolBarRender'}
      config={addConfig}
    />,
  ],
  tableAlertOptionRender: ({ selectedRowKeys }: any) => (
    <Space size={16}>
      <Promise.DeleteSchemaConfig config={deleteConfig} />
      <a>导出数据</a>
    </Space>
  ),
};
