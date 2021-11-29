/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Promise } from '@hocgin/ui';
import { TableColumns } from '@/Promise/components/Table/type';
import { Menu, Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import data from './table-config';

const tableColumns: TableColumns<any> = [
  {
    title: '配置名称',
    dataIndex: 'title',
    fixed: 'left',
    width: 200,
  },
  {
    title: '配置2',
    dataIndex: 'code',
    ellipsis: true,
  },
  {
    title: '配置3',
    width: 200,
    dataIndex: 'name',
  },
];

export default () => {
  let styles = { width: '100%' };

  let buttons = (
    <>
      <Button htmlType="button" icon={<PlusOutlined />} type="primary">
        新建
      </Button>
    </>
  );
  let searchItems = [
    <Form.Item label="关键词搜索" key="keyword" name="keyword">
      <Input style={styles} placeholder="请输入关键词" />
    </Form.Item>,
  ];
  const batchMenus = [<Menu.Item key="rowsDelete">批量移出</Menu.Item>];
  let rowMenus = [
    <Menu.Item key="rowUpdate">修改</Menu.Item>,
    <Menu.Item key="rowGrant">赋予权限</Menu.Item>,
    <Menu.Divider key="divider" />,
    <Menu.Item key="rowDelete">删除</Menu.Item>,
  ];

  let useAction = {
    paging: async (args: any) => {
      return data;
    },
  };

  return (
    <Promise.Table
      title={'分组列表'}
      useAction={useAction}
      tableColumns={tableColumns}
      batchMenus={batchMenus}
      rowMenus={rowMenus}
      buttons={buttons}
      searchItems={searchItems}
    />
  );
};
