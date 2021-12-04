import React from 'react';
import { useGet } from '@hocgin/ui';
import { Dom } from '@hocgin/ui';

export const config: any = {
  useAction: {
    initialValues: async (params: Record<string, any>) => {
      console.log('scheme-archive-config.tsx', params);
      return {
        title: '666',
        state: 'vx',
      };
    },
    submit: async (params: Record<string, any>) => {
      console.log('保存', params);
      return true;
    },
  },
  layoutType: 'ModalForm',
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
      valueType: Dom.columnPrefix('select'),
      params: {
        useAction: {
          initialValues: async (params: Record<string, any>) => {
            return useGet('http://127.0.0.1:8000/api/test_select').then(
              ({ data }) => data,
            );
          },
        },
      },
    },
    {
      title: '树型选择',
      dataIndex: 'gin_tree_select_name',
      valueType: Dom.columnPrefix('treeSelect'),
      params: {
        useAction: {
          initialValues: async (params: Record<string, any>) => {
            return useGet('http://api-dev.hocgin.top/api/tree_select').then(
              ({ data }) => data,
            );
          },
        },
      },
    },
    {
      title: 'radioButton',
      dataIndex: 'gin_radioButton_name',
      valueType: Dom.columnPrefix('radioButton'),
      params: {
        useAction: {
          initialValues: async (params: Record<string, any>) => {
            return useGet('http://api-dev.hocgin.top/api/test_select').then(
              ({ data }) => data,
            );
          },
        },
      },
    },
    {
      title: 'radio',
      dataIndex: 'gin_radio_name',
      valueType: Dom.columnPrefix('radio'),
      params: {
        useAction: {
          initialValues: async (params: Record<string, any>) => {
            return useGet('http://api-dev.hocgin.top/api/test_select').then(
              ({ data }) => data,
            );
          },
        },
      },
    },
    {
      title: 'checkbox',
      dataIndex: 'gin_checkbox_name',
      valueType: Dom.columnPrefix('checkbox'),
      params: {
        useAction: {
          initialValues: async (params: any) => {
            return useGet('http://api-dev.hocgin.top/api/test_select').then(
              ({ data }) => data,
            );
          },
        },
      },
    },
    {
      title: '文件上传',
      dataIndex: 'gin_upload_name',
      valueType: Dom.columnPrefix('upload'),
      params: {
        action: 'http://api-dev.hocgin.top/api/upload',
        maxCount: 1,
      },
    },
  ],
};
