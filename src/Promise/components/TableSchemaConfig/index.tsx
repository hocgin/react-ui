import React from 'react';
import { Table, Space } from 'antd';
import { Promise, Utils } from '@hocgin/ui';
import Service from './service';
import { asTableDataResult } from '@/Promise/components/scheme';

type ConfigType = {
  /**
   * 地址
   */
  action: string;
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

export interface TableSchemaConfigProps {
  /**
   * 配置
   */
  config: ConfigType;
}

// @formatter: off
const TableSchemaConfig: React.FC<TableSchemaConfigProps> = ({ config }) => {
  // @formatter: on
  let { action, title, toolBarRender, columns = [], ...rest } = config;
  let paging = async (
    { pageSize, current, ...params }: any = {},
    sorter: any,
    filter: any,
  ) => {
    let resp = await Service.paging(action, {
      ...params,
      size: pageSize,
      page: current,
    });
    return asTableDataResult(resp);
  };

  let style = { marginLeft: 8 };
  let rowSelection = {
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
  };
  let pagination = { pageSize: 10 };

  return (
    <Promise.TableSchema
      headerTitle={title}
      request={paging}
      cardBordered
      tableAlertRender={({
        selectedRowKeys,
        selectedRows,
        onCleanSelected,
      }) => (
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
    />
  );
};

export default TableSchemaConfig;
