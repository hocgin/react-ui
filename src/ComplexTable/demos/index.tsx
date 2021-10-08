/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Button, Divider, Dropdown, Form, Input, Menu, Modal } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { ComplexTable, Utils } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  const BatchMenus = null;
  const selectedRows: [] = [];
  const paging = {};
  const tableColumns = [{
    title: '配置名称',
    dataIndex: 'title',
    fixed: 'left',
    key: 'title',
    ellipsis: true,
  }, {
    title: '配置2',
    dataIndex: 'title',
    fixed: 'left',
    key: 'title',
    ellipsis: true,
  }, {
    title: '配置3',
    dataIndex: 'title',
    fixed: 'left',
    key: 'title',
    ellipsis: true,
  }];
  return (<ComplexTable toolbarTitle={'分组列表'}
                        toolbarMenu={BatchMenus}
                        toolbarChildren={<Button htmlType='button' icon={<PlusOutlined />} type='primary'>新建</Button>}
                        searchBarChildren={[
                          <Form.Item label='关键词搜索'
                                     name='keyword'>
                            <Input style={{ width: '100%' }} placeholder='请输入关键词' />
                          </Form.Item>,
                        ]}
                        tableLoading={false}
                        tableData={Utils.Ui.fastGetTableData(paging)}
                        selectedRows={selectedRows}
                        tableColumns={tableColumns} />);
};
