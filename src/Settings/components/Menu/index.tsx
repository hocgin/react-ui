import React from 'react';
import { Menu as AnMenu } from 'antd';
import classnames from 'classnames';
import Empty from '@/Empty';
import { ConfigContext } from '@/ConfigProvider';

interface MenuItem {
  title: string;
  scope?: string;
}

export interface Group {
  title: string;
  menus?: MenuItem[];
}

const Menu: React.FC<{
  prefixCls?: string;
  className?: string;
  activeKey?: string;
  groups?: Group[];
  onClick?: (scope: string) => void;
}> = ({ className, activeKey, onClick, groups = [], ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('settings--Menu', props.prefixCls);
  return (
    <div className={classnames(prefixCls, className)}>
      {groups.length ? (
        <AnMenu activeKey={activeKey} onClick={({ key }) => onClick?.(key)}>
          {(groups || []).map((group, index) => {
            return (
              <>
                <AnMenu.Divider />
                <AnMenu.ItemGroup title={group.title}>
                  {(group.menus || []).map((menu) => {
                    return (
                      <AnMenu.Item key={menu.scope}>{menu.title}</AnMenu.Item>
                    );
                  })}
                </AnMenu.ItemGroup>
              </>
            );
          })}
        </AnMenu>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Menu;
