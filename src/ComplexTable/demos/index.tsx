/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Button, Divider, Dropdown, Form, Input, Menu, Modal } from 'antd';
import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import { ComplexTable, Utils } from '@hocgin/ui';
import styles from './index.less';
import { IPage } from '@/Utils/interface';

export default () => {
  const BatchMenus: React.ReactElement = (<div />);
  const selectedRows: [] = [];
  const paging = {
    current: 10,
    total: 10,
    size: 10,
    records: [{
      id: 1,
      title: '测试',
      code: '666',
      name: '66611',
    }, {
      id: 2,
      title: '2测试',
      code: '6266',
      name: '626611',
    }, {
      id: 3,
      title: '3',
      code: '6636',
      name: '663611',
    }, {
      id: 4,
      title: '4测试',
      code: '64566',
      name: '664611',
    }, {
      id: 5,
      title: '5测试',
      code: '6566',
      name: '665611',
    }],
  } as IPage;
  const tableColumns = [{
    title: '配置名称',
    dataIndex: 'title',
    fixed: 'left',
  }, {
    title: '配置2',
    dataIndex: 'code',
    ellipsis: true,
  }, {
    title: '配置3',
    fixed: 'right',
    dataIndex: 'name',
  }];
  return (<ComplexTable title={'分组列表'}
                        buttons={<Button htmlType='button' icon={<PlusOutlined />} type='primary'>新建</Button>}
                        searchItems={[
                          <Form.Item label='关键词搜索' name='keyword'>
                            <Input placeholder='请输入关键词' />
                          </Form.Item>,
                        ]}
                        tableLoading={false}
                        tableData={Utils.Ui.fastGetTableData(paging)}
                        selectedRows={selectedRows}
                        tableColumns={tableColumns} />);
};
