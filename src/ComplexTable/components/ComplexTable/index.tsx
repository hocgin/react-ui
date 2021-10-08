import React from 'react';
import styles from './index.less';
import Toolbar from '../Toolbar';
import { Card } from 'antd';
import StandardTable from '../StandardTable';
import SearchBar from '../SearchBar';

interface ComplexTableProps {
  tableLoading?: boolean,
  onClickSearch?: () => void,
  onSelectRow?: (values?: any[]) => void,
  onChangeStandardTable?: (values: any[]) => void,
  expandable?: any;
  rowKey?: string,
  selectedRows?: string[],
  toolbarTitle?: string,
  toolbarMenu?: React.ReactElement,
  toolbarChildren?: React.ReactNode,
  searchBarChildren?: React.ReactElement[],
  toolbarEnabled?: boolean,
  searchBarEnabled?: boolean,
  tableColumns?: any[],
  tableData?: any[],
}

interface ComplexTableState {
}


class ComplexTable extends React.PureComponent<ComplexTableProps, ComplexTableState> {

  private static defaultProps = {
    tableLoading: false,
    toolbarEnabled: true, toolbarTitle: null, toolbarMenu: null, toolbarChildren: null,
    searchBarEnabled: true, searchBarChildren: null, onClickSearch: () => {
    },
    tableColumns: [], tableData: [],
  };

  state = {};

  render() {
    let {
      rowKey,
      // Toolbar
      toolbarEnabled, toolbarTitle, toolbarMenu, toolbarChildren,
      // SearchBar
      searchBarEnabled, searchBarChildren, onClickSearch,
      // Table
      tableColumns, tableData, tableLoading, selectedRows, onSelectRow, onChangeStandardTable, expandable,
    } = this.props;

    return (<Card className={styles.component} bordered={false} bodyStyle={{ padding: 0 }}>
        {/*搜索栏*/}
        {searchBarEnabled && <SearchBar className={styles.searchBar} onSubmit={onClickSearch}>
          {searchBarChildren}
        </SearchBar>}
        {/*工具条*/}
        {toolbarEnabled && <div className={styles.toolbar}>
          <div className={styles.toolbarTitle}>{toolbarTitle}</div>
          <Toolbar menu={toolbarMenu} selectedRows={selectedRows || []}>
            {toolbarChildren}
          </Toolbar>
        </div>}
        {/*数据展示*/}
        <StandardTable rowKey={rowKey || 'id'} selectedRows={selectedRows || []}
                       expandable={expandable}
                       loading={tableLoading}
                       data={tableData}
                       columns={tableColumns}
                       onSelectRow={onSelectRow}
                       onChange={onChangeStandardTable} />
      </Card>
    );
  }
}

export default ComplexTable;
