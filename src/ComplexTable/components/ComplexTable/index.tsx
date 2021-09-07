import React from 'react';
import styles from './index.less';
import { Card } from 'antd';
import StandardTable from '../StandardTable';
import Toolbar from '../Toolbar';
import { SearchBar } from '@hocgin/ui';

interface ComplexTableProps {
  tableLoading?: boolean;
  onClickSearch?: (values: any) => void;
  onSelectRow?: (values?: any[]) => void;
  onClickOperateRows?: (event: { key: string }, rows: any[]) => void;
  onClickToolbarMenu?: (event: { key: string }) => void;
  onChangeStandardTable?: (values: any, filtersArg: any, sorter: any) => void;
  expandable?: any;
  rowKey?: string;
  selectedRows?: string[];
  title?: string;
  batchMenus?: React.ReactElement[];
  buttons?: React.ReactNode;
  searchItems?: React.ReactElement[];
  toolbarEnabled?: boolean;
  tableColumns?: any[];
  tableData?: any;
}

interface ComplexTableState {}

class ComplexTable extends React.Component<
  ComplexTableProps,
  ComplexTableState
> {
  static StandardTable: typeof StandardTable;

  private static defaultProps = {
    tableLoading: false,
    toolbarEnabled: true,
    toolbarTitle: null,
    toolbarMenu: null,
    toolbarChildren: null,
    onClickSearch: () => {},
    tableColumns: [],
    tableData: [],
  };

  state = {};

  render() {
    let {
      rowKey,
      // Toolbar
      toolbarEnabled,
      title,
      batchMenus,
      buttons,
      // SearchBar
      searchItems = [],
      onClickSearch,
      // Table
      tableColumns,
      tableData,
      tableLoading,
      selectedRows,
      onSelectRow,
      onChangeStandardTable,
      expandable,
      onClickToolbarMenu,
    } = this.props;

    return (
      <Card
        className={styles.component}
        bordered={false}
        bodyStyle={{ padding: 0 }}
      >
        {/*搜索栏*/}
        {searchItems?.length > 0 && (
          <SearchBar className={styles.searchBar} onSubmit={onClickSearch}>
            {searchItems}
          </SearchBar>
        )}
        {/*工具条*/}
        {toolbarEnabled && (
          <div className={styles.toolbar}>
            <div className={styles.toolbarTitle}>{title}</div>
            <Toolbar
              batchMenus={batchMenus}
              selectedRows={selectedRows}
              onClickMenu={onClickToolbarMenu}
            >
              {buttons}
            </Toolbar>
          </div>
        )}
        {/*数据展示*/}
        <StandardTable
          rowKey={rowKey || 'id'}
          selectedRows={selectedRows}
          expandable={expandable}
          loading={tableLoading}
          data={tableData}
          columns={tableColumns}
          onSelectRow={onSelectRow}
          onChange={onChangeStandardTable}
        />
      </Card>
    );
  }
}

export default ComplexTable;
