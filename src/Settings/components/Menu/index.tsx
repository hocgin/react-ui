import React from 'react';
import { Menu } from 'antd';
import classnames from 'classnames';
import styles from './index.less';
import { Empty } from '@hocgin/ui';
import {
  MailOutlined,
} from '@ant-design/icons';

interface MenuItem {
  title: string;
  scope?: string;
}

export interface Group {
  title: string;
  menus?: MenuItem[];
}

const LeftMenu: React.FC<{
  className?: string;
  activeKey?: string;
  groups?: Group[];
  onClick?: (scope: string) => void;
}> = ({ className, activeKey, onClick, groups = [] }) => {
  return <div className={classnames(styles.menu, className)}>
    {groups.length ? <Menu activeKey={activeKey} onClick={({ key }) => onClick?.(key)}>
      {(groups || []).map((group, index) => {
        return <>
          <Menu.Divider />
          <Menu.ItemGroup title={group.title}>
            {(group.menus || []).map(menu => {
              return <Menu.Item key={menu.scope}>{menu.title}</Menu.Item>;
            })}
          </Menu.ItemGroup>
        </>;
      })}
    </Menu> : <Empty />}
  </div>;
};

export default LeftMenu;
