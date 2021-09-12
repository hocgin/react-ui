import React, { Fragment, PureComponent } from 'react';
import { Alert, Table } from 'antd';
import styles from './index.less';

function initTotalList(columns: any[]) {
  const totalList: [] = [];
  columns.forEach((column) => {
    if (column.needTotal) {
      // @ts-ignore
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

interface StandardTableProps {
  onSelectRow?: (selectedRows?: any[]) => void;
  onChange?: (pagination?: any, filters?: any, sorter?: any) => void;
  data?: any;
  loading?: boolean;
  hiddenAlert?: boolean;
  rowKey?: string;
  columns?: any[];
  selectedRows?: string[];
  expandable?: any;
  expandedRowRender?: any;
}

interface StandardTableState {
  selectedRowKeys: any[];
  needTotalList: any[];
}

class StandardTable extends PureComponent<
  StandardTableProps,
  StandardTableState
> {
  static defaultProps = {
    hiddenAlert: false,
    selectedRows: [],
  };

  constructor(props: any, context: any) {
    super(props, context);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps(nextProps: any) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys: any, selectedRows: any[]) => {
    let { needTotalList } = this.state;
    let updateNeedTotalList: any[] = (needTotalList || []).map((item: any) => ({
      ...item,
      total: selectedRows.reduce(
        (sum: number, val: string[]) => sum + parseFloat(val[item.dataIndex]),
        0,
      ),
    }));
    const { onSelectRow } = this.props;
    onSelectRow && onSelectRow(selectedRows);

    this.setState({ selectedRowKeys, needTotalList: updateNeedTotalList });
  };

  handleTableChange = (pagination: any, filters: any, sorter: any) => {
    const { onChange } = this.props;
    onChange && onChange(pagination, filters, sorter);
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const {
      data: { list, pagination },
      loading,
      columns,
      expandable,
      rowKey,
      expandedRowRender,
      hiddenAlert,
    } = this.props;

    const paginationProps = {
      // showSizeChanger: true,
      showQuickJumper: true,
      size: 'small',
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: (record: any) => ({
        disabled: record.disabled,
      }),
    };

    return (
      <div className={styles.standardTable}>
        {hiddenAlert ? null : (
          <div className={styles.tableAlert}>
            <Alert
              message={
                <Fragment>
                  已选择{' '}
                  <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>{' '}
                  项&nbsp;&nbsp;
                  {needTotalList.map((item) => (
                    <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                      {item.title} 总计&nbsp;
                      <span style={{ fontWeight: 600 }}>
                        {item.render ? item.render(item.total) : item.total}
                      </span>
                    </span>
                  ))}
                  <a
                    onClick={this.cleanSelectedKeys}
                    style={{ marginLeft: 24 }}
                  >
                    清空
                  </a>
                </Fragment>
              }
              type="info"
              showIcon
            />
          </div>
        )}
        <Table
          rowKey={rowKey || 'key'}
          scroll={{ x: 1500 }}
          loading={loading}
          expandable={expandable}
          rowSelection={rowSelection}
          dataSource={list}
          columns={columns}
          expandedRowRender={expandedRowRender}
          pagination={paginationProps}
          onChange={this.handleTableChange}
        />
      </div>
    );
  }
}

export default StandardTable;
