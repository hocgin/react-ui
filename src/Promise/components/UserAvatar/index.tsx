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
import { PromiseKit } from '@hocgin/hkit';

const UserInfo: React.FC<{
  prefixCls?: string;
  src?: React.ReactNode | string;
  title?: React.ReactNode | string;
  subtitle?: React.ReactNode | string;
}> = ({ src, title, ...props }, ref) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('promise--UserInfo', props.prefixCls);
  return (
    <div className={prefixCls}>
      <div>
        <Avatar shape="circle" icon={<UserOutlined />} src={src} />
      </div>
      <div className={`${prefixCls}-info`}>
        <div className={`${prefixCls}-title`}>{title ?? 'unknown'}</div>
        <div className={`${prefixCls}-subtitle`}>{props?.subtitle}</div>
      </div>
    </div>
  );
};

interface UserAvatarParams {
  name: string;
  email: string;
  picture: string;
  isPro?: boolean;
}

const UserAvatar: React.FC<{
  prefixCls?: string;
  className?: string;
  defaultParams?: UserAvatarParams;
  onLogout?: () => void;
}> = (props, ref) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('promise--UserAvatar', props.prefixCls);
  let userInfo = props?.defaultParams;
  console.log('userInfo', userInfo);
  let menu = (
    <Menu className={'menu'}>
      <UserInfo
        title={userInfo?.name}
        subtitle={userInfo?.email}
        src={userInfo?.picture}
      />
      <Menu.Divider />
      <Menu.Item icon={<UserOutlined />} disabled>
        个人中心
      </Menu.Item>
      {/*<Menu.Item icon={<MessageOutlined />}>消息中心</Menu.Item>*/}
      {/*<Menu.Item icon={<AccountBookOutlined />}>订单中心</Menu.Item>*/}
      <Menu.Item icon={<SettingOutlined />} disabled>
        设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        icon={<ExportOutlined />}
        onClick={props?.onLogout ?? PromiseKit.DoveService.logout}
      >
        退出
      </Menu.Item>
    </Menu>
  );
  return (
    <div className={prefixCls}>
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar
          shape="circle"
          size={36}
          icon={<UserOutlined />}
          src={userInfo?.picture}
        />
      </Dropdown>
    </div>
  );
};

export default UserAvatar;
