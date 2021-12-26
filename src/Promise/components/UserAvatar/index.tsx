import * as React from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import styles from './index.less';
import {
  UserOutlined,
  ExportOutlined,
  MessageOutlined,
  SettingOutlined,
  AccountBookOutlined,
} from '@ant-design/icons';

const UserInfo: React.FC<{
  avatarSrc?: React.ReactNode;
  title?: React.ReactNode;
}> = ({ avatarSrc, title }, ref) => {
  return (
    <div className={styles.userInfo}>
      <div>
        <Avatar
          shape="circle"
          size={64}
          icon={<UserOutlined />}
          src={avatarSrc}
        />
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

const Index: React.FC<{
  className?: string;
  defaultParams?: any;
}> = (props, ref) => {
  let menu = (
    <Menu className={styles.menu}>
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
    <div>
      <Dropdown overlay={menu} trigger={['click']}>
        <Avatar shape="circle" size={36} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};

export default Index;
