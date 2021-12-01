import React, { useState } from 'react';
import { ComplexTable, Utils, Dom } from '@hocgin/ui';
import { EventInfo, TableColumns, TableData } from './type';
import { IPage, PageRo } from '@/Utils/interface';
import { Menu, Divider, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useMount, useRequest } from 'ahooks';
import { UseAction } from './type';

interface TableProps {
  /**
   * 请求地址
   */
  useAction: UseAction;
  title?: string;
  batchMenus?: React.ReactElement[];
  rowMenus: React.ReactElement[];
  tableColumns?: TableColumns<any>;
  addColumns?: any[];
  onSelectRow?: (values: any[]) => void;
  /**
   * 单行操作: 返回 true 允许进行默认操作
   * @param event
   * @param record
   */
  onClickOperateRow?: (event: EventInfo, record: TableData) => boolean;
  /**
   * 多行操作: 返回 true 允许进行默认操作
   * @param event
   * @param values
   */
  onClickOperateRows?: (event: EventInfo, values: any[]) => boolean;
  buttons?: React.ReactNode;
  // 搜索项
  searchItems?: React.ReactElement[];
}

interface TableState {
  selectedRows: any[];
  pagingLoading: boolean;
  operateRow?: any;
  searchValue?: any;
  data: IPage;
}

// @formatter: off
const Index: React.FC<TableProps> = ({
                                       tableColumns = [],
                                       rowMenus = [],
                                       useAction,
                                       title,
                                       onSelectRow,
                                       onClickOperateRow,
                                       onClickOperateRows,
                                       batchMenus, buttons, searchItems = [], ...rest
                                     }) => {
  // @formatter: on
  let [data, setData] = useState<IPage>();
  let [defaultParams, setDefaultParams] = useState<PageRo>({});
  let [selectedRows, setSelectedRows] = useState<any[]>([]);
  let [operateRow, setOperateRow] = useState<any>();

  let { run, loading } = useRequest<IPage, any[]>(useAction.paging, {
    manual: true,
    onSuccess: (data: IPage) => setData(data),
  });

  // 选择多行事件
  let onChangeSelectRow = (rows: any) => {
    let selectedRows = rows.map(({ id }: TableData) => id);
    setSelectedRows(selectedRows);
    onSelectRow && onSelectRow(selectedRows);
  };

  // 某行操作事件
  let _onClickOperateRows = (menuInfo: any) => {
    onClickOperateRows && onClickOperateRows(menuInfo, selectedRows);
  };

  // 表单变更事件
  let onChangeStandardTable = ({ pageSize, current }: any, filtersArg: any, sorter: any) => {
    setDefaultParams({ ...defaultParams, page: current, pageSize });
  };

  // 生成表单列数组
  let listTableColumns = () => {
    return [
      ...tableColumns,
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 200,
        render: (text: string, record: TableData) => {
          const _onClickOperateRow = (record: TableData, event: EventInfo) => {
            setOperateRow(record?.id);
            onClickOperateRow && onClickOperateRow(event, record);
          };
          const RowMenus = (
            <Menu onClick={_onClickOperateRow.bind(this, record)}>
              {rowMenus}
            </Menu>
          );

          return (
            <>
              <a
                rel='noopener noreferrer'
                onClick={_onClickOperateRow.bind(this, record, {
                  key: 'rowDetail',
                })}
              >
                查看详情
              </a>
              <Divider type='vertical' />
              <Dropdown overlay={RowMenus} disabled={rowMenus.length === 0}>
                <a rel='noopener noreferrer'>
                  更多操作 <DownOutlined />
                </a>
              </Dropdown>
            </>
          );
        },
      },
    ];
  };

  useMount(() => run([defaultParams]));

  return (
    <ComplexTable
      title={title}
      tableLoading={loading}
      batchMenus={batchMenus}
      buttons={buttons}
      searchItems={searchItems}
      tableData={Dom.fastGetTableData(data)}
      selectedRows={selectedRows}
      onSelectRow={onChangeSelectRow}
      onClickSearch={(values: any) => setDefaultParams(values)}
      onClickToolbarMenu={_onClickOperateRows}
      onChangeStandardTable={onChangeStandardTable}
      tableColumns={listTableColumns()}
    />
  );
};
export default Index;
