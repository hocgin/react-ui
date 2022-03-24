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
        html: '<p>666 <strong>777</strong></p>',
        rich: '<p>666 <strong>777</strong></p>',
        markdown: `# 这是标题1 \n ## 这是标题2 \n ### 这是标题3 \n`,
        stretch:
          '这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题这是标题',
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
    }, {
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
    {
      title: '链接',
      dataIndex: 'link',
      valueType: Dom.columnPrefix('link'),
    },
    {
      title: '文本',
      dataIndex: 'stretch',
      valueType: Dom.columnPrefix('stretch'),
    },
    {
      title: '富文本 html',
      dataIndex: 'html',
      valueType: Dom.columnPrefix('html'),
    },
    {
      title: '富文本',
      dataIndex: 'rich',
      valueType: Dom.columnPrefix('rich'),
    },
    {
      title: 'Markdown',
      dataIndex: 'markdown',
      valueType: Dom.columnPrefix('markdown'),
    },
  ],
};
