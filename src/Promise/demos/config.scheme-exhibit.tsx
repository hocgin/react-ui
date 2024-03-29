import React from 'react';
import { UseAction } from '@/Promise/components/Schema/ExhibitSchemaConfig/type';
import { UIKit } from '@hocgin/ui';

export const config: any = {
  layoutType: 'ModalForm',
  useAction: {
    initialValues: async (params: Record<string, any>) => {
      console.log(params, 'scheme-exhibit-config.tsx');
      return {
        title: '这是标题',
        state: 'vx',
        searchLbs: {
          adcode: '350203',
          address: '福建省厦门市思明区筼筜街道体育路95号厦门文化艺术中心',
          location: { lat: 24.490474, lng: 118.11022 },
          name: '厦门文化艺术中心',
        },
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
      title: '地址选择器',
      dataIndex: 'searchLbs',
      valueType: UIKit.columnPrefix('searchLbs'),
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
    },
    {
      title: '树型选择',
      dataIndex: 'gin_tree_select_name',
      valueType: UIKit.columnPrefix('gin.treeSelect'),
    },
    {
      title: 'radioButton',
      dataIndex: 'gin_radioButton_name',
      valueType: UIKit.columnPrefix('radioButton'),
    },
    {
      title: 'radio',
      dataIndex: 'gin_radio_name',
      valueType: UIKit.columnPrefix('radio'),
    },
    {
      title: 'checkbox',
      dataIndex: 'gin_checkbox_name',
      valueType: UIKit.columnPrefix('checkbox'),
    },
    {
      title: '文件上传',
      dataIndex: 'gin_upload_name',
      valueType: UIKit.columnPrefix('upload'),
    },
    {
      title: '链接',
      dataIndex: 'link',
      valueType: UIKit.columnPrefix('link'),
    },
    {
      title: '文本',
      dataIndex: 'stretch',
      valueType: UIKit.columnPrefix('stretch'),
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
