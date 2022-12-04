import React from 'react';
import { UIKit, LangKit } from '@hocgin/ui';
import treedata from './config.data-tree';

export const config: any = {
  useAction: {
    initialValues: async (params: Record<string, any>) => {
      console.log('scheme-archive-config.tsx', params);
      return {
        title: '666',
        state: 'vx',
        encoding: '这是自定义的',
        search: 'search_key',
        html: 'test html',
        searchName: 'searchName',
        gin_upload_name: {
          url: 'http://dummyimage.com/100x100',
          filename: '_reset.jpg',
        },
      };
    },
    submit: async (params: Record<string, any>) => {
      console.log('保存', params);
      return true;
    },
  },
  columns: [
    {
      title: '标题',
      dataIndex: 'title',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
      width: 'm',
    },
    {
      fieldProps: {
        name: ['search', 'searchName'],
      },
      valueType: 'dependency',
      columns: ({ search, searchName }: any) => {
        return [
          {
            title: 'search',
            dataIndex: 'search',
            valueType: UIKit.columnPrefix('search'),
            hideInTable: true,
            valueEnum: {
              [search]: searchName,
            },
            params: {
              useAction: {
                initialValues: async (params: Record<string, any>) =>
                  LangKit.sleep(1000).then(() => [
                    {
                      key: '这是key字段',
                      value: 'vx',
                    },
                  ]),
              },
            },
          },
        ];
      },
    },
    {
      fieldProps: {
        name: ['search', 'searchName'],
      },
      valueType: 'dependency',
      columns: ({ search2, search2Name }: any) => {
        return [
          {
            key: '22',
            title: 'search sleep',
            dataIndex: 'search2',
            valueType: UIKit.columnPrefix('search'),
            hideInTable: true,
            valueEnum: { [search2]: search2Name },
            params: {
              useAction: {
                initialValues: async (params: Record<string, any>) =>
                  LangKit.sleep(1000).then(() => [
                    {
                      key: '这是key字段',
                      value: 'vx',
                    },
                  ]),
              },
            },
          },
        ];
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
      valueType: 'select',
      width: 'm',
      request: () => {
        return [
          {
            label: 'lab',
            value: 'vx',
          },
        ];
      },
    },
    {
      title: '下拉选择',
      dataIndex: 'gin_select_name',
      valueType: UIKit.columnPrefix('select'),
      params: {
        useAction: {
          initialValues: async (params: Record<string, any>) => [
            {
              key: 'lab',
              value: 'vx',
            },
          ],
        },
      },
    },
    {
      title: '树型选择',
      dataIndex: 'gin_tree_select_name',
      valueType: UIKit.columnPrefix('treeSelect'),
      params: {
        useAction: {
          initialValues: async (params: Record<string, any>) => treedata,
        },
      },
    },
    {
      title: 'radioButton',
      dataIndex: 'gin_radioButton_name',
      valueType: UIKit.columnPrefix('radioButton'),
      params: {
        useAction: {
          initialValues: async (params: Record<string, any>) => [
            {
              key: 'lab',
              value: 'vx',
            },
          ],
        },
      },
    },
    {
      title: 'radio',
      dataIndex: 'gin_radio_name',
      valueType: UIKit.columnPrefix('radio'),
      params: {
        useAction: {
          initialValues: async (params: Record<string, any>) => [
            {
              key: 'lab',
              value: 'vx',
            },
          ],
        },
      },
    },
    {
      title: 'checkbox',
      dataIndex: 'gin_checkbox_name',
      valueType: UIKit.columnPrefix('checkbox'),
      params: {
        useAction: {
          initialValues: async (params: Record<string, any>) => [
            {
              key: 'lab',
              value: 'vx',
            },
          ],
        },
      },
    },
    {
      title: '文件上传',
      dataIndex: 'gin_upload_name',
      valueType: UIKit.columnPrefix('upload'),
      params: {
        action: `${
          LangKit.isBrowser() ? window.location.origin : ''
        }/api/com/file/upload`,
        maxCount: 2,
      },
    },
    {
      title: '编号',
      dataIndex: 'encoding',
      valueType: UIKit.columnPrefix('encoding'),
    },
    {
      title: '富文本 html',
      dataIndex: 'html',
      valueType: UIKit.columnPrefix('html'),
    },
    {
      title: '富文本',
      dataIndex: 'rich',
      valueType: UIKit.columnPrefix('rich'),
    },
    {
      title: 'Markdown',
      dataIndex: 'markdown',
      valueType: UIKit.columnPrefix('markdown'),
    },
  ],
};
