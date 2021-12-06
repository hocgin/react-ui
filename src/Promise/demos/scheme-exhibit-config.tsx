import React from 'react';
import { UseAction } from '@/Promise/components/Schema/ExhibitSchemaConfig/type';
import { Dom } from '@hocgin/ui';

export const config: any = {
  layoutType: 'ModalForm',
  useAction: {
    initialValues: async (params: Record<string, any>) => {
      console.log(params, 'scheme-exhibit-config.tsx');
      return {
        title: '这是标题',
        state: 'vx',
      };
    },
  } as UseAction,
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
    },
    {
      title: '树型选择',
      dataIndex: 'gin_tree_select_name',
      valueType: Dom.columnPrefix('gin.treeSelect'),
    },
    {
      title: 'radioButton',
      dataIndex: 'gin_radioButton_name',
      valueType: Dom.columnPrefix('radioButton'),
    },
    {
      title: 'radio',
      dataIndex: 'gin_radio_name',
      valueType: Dom.columnPrefix('radio'),
    },
    {
      title: 'checkbox',
      dataIndex: 'gin_checkbox_name',
      valueType: Dom.columnPrefix('checkbox'),
    },
    {
      title: '文件上传',
      dataIndex: 'gin_upload_name',
      valueType: Dom.columnPrefix('upload'),
    },
  ],
};
