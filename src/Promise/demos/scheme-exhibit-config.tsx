import React from 'react';

export const config: any = {
  action: 'https://api-dev.hocgin.top/api/xx/1',
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
    },
    {
      title: '树型选择',
      dataIndex: 'gin_tree_select_name',
      valueType: 'gin.treeSelect',
    },
    {
      title: 'radioButton',
      dataIndex: 'gin_radioButton_name',
      valueType: 'gin.radioButton',
    },
    {
      title: 'radio',
      dataIndex: 'gin_radio_name',
      valueType: 'gin.radio',
    },
    {
      title: 'checkbox',
      dataIndex: 'gin_checkbox_name',
      valueType: 'gin.checkbox',
    },
    {
      title: '文件上传',
      dataIndex: 'gin_upload_name',
      valueType: 'gin.upload',
    },
  ],
};
