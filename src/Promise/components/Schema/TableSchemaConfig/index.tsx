import React from 'react';
import { Table, Space } from 'antd';
import TableSchema from './table-schema';
import { UseAction } from './type';

type ConfigType = {
  /**
   * 请求
   */
  useAction: UseAction;
  /**
   * 字段
   */
  columns: any[];
  /**
   * 标题
   */
  title?: string | any;
  toolBarRender?: any;
};

// @formatter: off
const TableSchemaConfig: React.FC<{
  /**
   * 配置
   */
  config: ConfigType;
}> = ({ config }) => {
  // @formatter: on
  let { useAction, title, toolBarRender, columns = [], ...rest } = config;
  let defaultParams = {};

  let request = async (
    { pageSize, current, ...params }: any = {},
    sorter: any,
    filter: any,
  ) => {
    let ro = {
      ...defaultParams,
      ...params,
      page: current,
      size: pageSize,
    };
    return useAction.paging(ro).then((data) => ({
      success: true,
      data: data?.records ?? [],
      total: data?.total || 0,
    }));
  };

  let style = { marginLeft: 8 };
  let rowSelection = {
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
  };
  let pagination = { pageSize: 20 };

  return <TableSchema
    headerTitle={title}
    request={request}
    cardBordered
    tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }: any) => (
      <Space size={24}>
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={style} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
      </Space>
    )}
    rowSelection={rowSelection}
    search={{}}
    toolBarRender={toolBarRender}
    pagination={pagination}
    columns={columns}
    {...rest}
  />;
};

export default TableSchemaConfig;
