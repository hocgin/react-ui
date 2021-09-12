import React from 'react';

export const config: any = {
  action: 'https://api-dev.hocgin.top/api/xx',
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
      valueType: 'gin.select',
      params: {
        action: 'http://api-dev.hocgin.top/api/test_select',
      },
    },
    {
      title: '树型选择',
      dataIndex: 'gin_tree_select_name',
      valueType: 'gin.treeSelect',
      params: {
        action: 'http://api-dev.hocgin.top/api/tree_select',
      },
    },
    {
      title: 'radioButton',
      dataIndex: 'gin_radioButton_name',
      valueType: 'gin.radioButton',
      params: {
        action: 'http://api-dev.hocgin.top/api/test_select',
      },
    },
    {
      title: 'radio',
      dataIndex: 'gin_radio_name',
      valueType: 'gin.radio',
      params: {
        action: 'http://api-dev.hocgin.top/api/test_select',
      },
    },
    {
      title: 'checkbox',
      dataIndex: 'gin_checkbox_name',
      valueType: 'gin.checkbox',
      params: {
        action: 'http://api-dev.hocgin.top/api/test_select',
      },
    },
    {
      title: '文件上传',
      dataIndex: 'gin_upload_name',
      valueType: 'gin.upload',
      params: {
        action: 'http://api-dev.hocgin.top/api/upload',
        maxCount: 1,
      },
    },
  ],
};
