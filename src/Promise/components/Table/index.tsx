import React, { PureComponent, ReactNode } from 'react';
import { ComplexTable, Utils } from '@hocgin/ui';
import { Config } from '@/Utils/config';
import { EventInfo, TableColumns, TableData } from './interface';
import { HttpResult, IPage, OverlayFunc } from '@/Utils/interface';
import { Menu, Divider, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

interface TableProps {
  action: string;
  title?: string;
  batchMenus?: React.ReactElement[];
  rowMenus: React.ReactElement[];
  tableColumns?: TableColumns<any>;
  onSelectRow?: (values: any[]) => void;
  // 单条操作: 返回 true 允许进行默认操作
  onClickOperateRow?: (event: EventInfo, record: TableData) => boolean;
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

class Index extends PureComponent<TableProps, TableState> {
  static defaultProps = {
    tableColumns: [],
    toolbarTitle: null,
  };
  state = {
    pagingLoading: false,
    selectedRows: [],
    operateRow: null,
    searchValue: {},
    data: {} as IPage,
  };

  componentDidMount() {
    this.paging();
  }

  render() {
    let { title, batchMenus, buttons, searchItems = [] } = this.props;
    let { selectedRows, data, pagingLoading } = this.state;

    return (
      <ComplexTable
        title={title}
        tableLoading={pagingLoading}
        batchMenus={batchMenus}
        buttons={buttons}
        searchItems={searchItems}
        tableData={Utils.Ui.fastGetTableData(data)}
        selectedRows={selectedRows}
        onSelectRow={this.onChangeSelectRow}
        onClickSearch={this.onClickSearch}
        onClickToolbarMenu={this.onClickOperateRows}
        onChangeStandardTable={this.onChangeStandardTable}
        tableColumns={this.tableColumns}
      />
    );
  }

  paging = () => {
    let { action } = this.props;
    let { searchValue } = this.state;
    this.setState({ pagingLoading: true }, () => {
      Utils.POST(
        `${Config.get(Config.ConfigKeys.baseServerUrl)}${action}/_paging`,
        { ...searchValue },
      )
        .then((result: HttpResult<any>) => {
          if (Utils.Ui.showErrorMessageIfExits(result)) {
            this.setState({ data: result?.data });
            return;
          }
        })
        .finally(() => this.setState({ pagingLoading: false }));
    });
  };

  onClickOperateRow = (event: EventInfo, record: TableData) => {
    console.debug('单行操作', event, record);
    let { onClickOperateRow } = this.props;
    let returnFlag = onClickOperateRow && onClickOperateRow(event, record);
    if (returnFlag === undefined || !returnFlag) {
      return;
    }
    console.debug('-> 进行默认操作');
  };

  onClickOperateRows = (menuInfo: any) => {
    let { onClickOperateRows } = this.props;
    let { selectedRows } = this.state;
    console.debug('多行操作', menuInfo, selectedRows);
    let returnFlag =
      onClickOperateRows && onClickOperateRows(menuInfo, selectedRows);
    if (returnFlag === undefined || !returnFlag) {
      return;
    }
    console.debug('-> 进行默认操作');
  };

  onChangeStandardTable = (
    { pageSize, current }: any,
    filtersArg: any,
    sorter: any,
  ) => {
    let { searchValue } = this.state;
    this.setState(
      {
        searchValue: {
          ...searchValue,
          size: pageSize,
          page: current,
        },
      },
      this.paging,
    );
  };

  onChangeSelectRow = (rows: any) => {
    let { onSelectRow } = this.props;
    let selectedRows = rows.map(({ id }: TableData) => id);
    this.setState(
      { selectedRows: selectedRows },
      () => onSelectRow && onSelectRow(selectedRows),
    );
  };

  onClickSearch = (values: any) => {
    this.setState({ searchValue: { ...values } }, this.paging);
  };

  get tableColumns() {
    let { tableColumns, rowMenus = [] } = this.props;
    // @ts-ignore
    return [
      ...tableColumns,
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 200,
        render: (text: string, record: TableData) => {
          const onClickOperateRow = (record: TableData, event: EventInfo) => {
            this.setState({ operateRow: record?.id }, () =>
              this.onClickOperateRow(event, record),
            );
          };
          const RowMenus = (
            <Menu onClick={onClickOperateRow.bind(this, record)}>
              {rowMenus}
            </Menu>
          );

          return (
            <>
              <a
                rel="noopener noreferrer"
                onClick={onClickOperateRow.bind(this, record, {
                  key: 'rowDetail',
                })}
              >
                查看详情
              </a>
              <Divider type="vertical" />
              <Dropdown overlay={RowMenus} disabled={rowMenus.length === 0}>
                <a rel="noopener noreferrer">
                  更多操作 <DownOutlined />
                </a>
              </Dropdown>
            </>
          );
        },
      },
    ];
  }
}

export default Index;
