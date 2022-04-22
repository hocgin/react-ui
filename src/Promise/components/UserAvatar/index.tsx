import React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';

import {
  UserOutlined,
  ExportOutlined,
  MessageOutlined,
  SettingOutlined,
  AccountBookOutlined,
} from '@ant-design/icons';
import { ConfigContext } from '@/ConfigProvider';

const UserInfo: React.FC<{
  prefixCls?: string;
  avatarSrc?: React.ReactNode;
  title?: React.ReactNode;
}> = ({ avatarSrc, title, ...props }, ref) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('promise--UserAvatar', props.prefixCls);
  return (
    <div className={prefixCls}>
      <div>
        <Avatar
          shape="circle"
          size={64}
          icon={<UserOutlined />}
          src={avatarSrc}
        />
      </div>
      <div className={'title'}>{title}</div>
    </div>
  );
};

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  defaultParams?: any;
}> = (props, ref) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('promise--UserAvatar', props.prefixCls);
  let menu = (
    <Menu className={'menu'}>
      <UserInfo title={'hocgin'} />
      <Menu.Divider />
      <Menu.Item icon={<UserOutlined />}>个人中心</Menu.Item>
      <Menu.Item icon={<MessageOutlined />}>消息中心</Menu.Item>
      <Menu.Item icon={<AccountBookOutlined />}>订单中心</Menu.Item>
      <Menu.Item icon={<SettingOutlined />}>设置</Menu.Item>
      <Menu.Divider />
      <Menu.Item icon={<ExportOutlined />}>退出</Menu.Item>
    </Menu>
  );
  return (
    <div className={prefixCls}>
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar shape="circle" size={36} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};

export default Index;
