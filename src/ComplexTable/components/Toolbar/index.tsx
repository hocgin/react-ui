import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown } from 'antd';
import styles from './index.less';
import PropTypes from 'prop-types';
import classnames from 'classnames';

interface ToolbarProps {
  selectedRows: string[],
  menu?: React.ReactElement,
  children: React.ReactNode,
  className?: string,
  style?: React.CSSProperties,
}

interface ToolbarState {
}

export default class Toolbar extends React.PureComponent<ToolbarProps, ToolbarState> {
  private static defaultProps = {
    selectedRows: [],
    menu: null,
    children: null,
  };

  render() {
    const { children, menu, selectedRows, className, style } = this.props;
    return (
      <div className={classnames(styles.tableListOperator, className)} style={style}>
        {children}
        {selectedRows.length > 0 &&
        menu && (<Dropdown overlay={menu}>
          <Button htmlType='button'>
            更多操作 <DownOutlined />
          </Button>
        </Dropdown>)}
      </div>
    );
  }
}
