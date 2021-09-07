/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Promise, Utils } from '@hocgin/ui';
import styles from './index.less';
import { TableColumns } from '@/Promise/components/PromiseTable/interface';
import { Menu, Button, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Config = Utils.Config;

const PromiseTable = Promise.PromiseTable;

const tableColumns: TableColumns<any> = [{
  title: '配置名称',
  dataIndex: 'title',
  fixed: 'left',
  width: 200,
}, {
  title: '配置2',
  dataIndex: 'code',
  ellipsis: true,
}, {
  title: '配置3',
  width: 200,
  dataIndex: 'name',
}];

Config.set(Config.ConfigKeys.baseServerUrl, 'https://api-dev.hocgin.top');
export default () => {
  let buttons = <>
    <Button htmlType='button' icon={<PlusOutlined />} type='primary'>新建</Button>
  </>;
  let searchItems = [
    <Form.Item label='关键词搜索' key='keyword' name='keyword'>
      <Input style={{ width: '100%' }} placeholder='请输入关键词' />
    </Form.Item>,
  ];
  const batchMenus = [
    <Menu.Item key='rowsDelete'>批量移出</Menu.Item>,
  ];
  let rowMenus = [
    <Menu.Item key='rowUpdate'>修改</Menu.Item>,
    <Menu.Item key='rowGrant'>赋予权限</Menu.Item>,
    <Menu.Divider />,
    <Menu.Item key='rowDelete'>删除</Menu.Item>,
  ];
  return (<PromiseTable title={'分组列表'} action={'/mina/mobile-wallpaper'}
                        tableColumns={tableColumns}
                        batchMenus={batchMenus}
                        rowMenus={rowMenus}
                        buttons={buttons}
                        searchItems={searchItems} />);
};
