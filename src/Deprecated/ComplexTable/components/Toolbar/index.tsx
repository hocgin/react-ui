import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import styles from './index.less';
import classnames from 'classnames';

interface ToolbarProps {
  selectedRows?: any[];
  batchMenus?: React.ReactElement[];
  onClickMenu?: (event: { key: string }) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

interface ToolbarState {}

export default class Toolbar extends React.PureComponent<
  ToolbarProps,
  ToolbarState
> {
  static defaultProps = {
    children: null,
  };

  render() {
    const {
      children,
      batchMenus = [],
      selectedRows = [],
      className,
      style,
      onClickMenu,
    } = this.props;
    return (
      <div
        className={classnames(styles.tableListOperator, className)}
        style={style}
      >
        {children}
        {batchMenus.length > 0 && (
          <Dropdown
            disabled={selectedRows.length === 0}
            overlay={<Menu onClick={onClickMenu}>{batchMenus}</Menu>}
          >
            <Button htmlType="button">
              批量操作 <DownOutlined />
            </Button>
          </Dropdown>
        )}
      </div>
    );
  }
}
