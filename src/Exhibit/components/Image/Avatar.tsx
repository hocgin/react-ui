import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';
import { ConfigContext } from '@/ConfigProvider';

export interface AvatarProps {
  /**
   * 图片
   */
  src?: React.ReactNode | string;
  /**
   * 大小
   */
  size?: AvatarSize;
  prefixCls?: string;
}

const Index: React.FC<AvatarProps> = ({ size = 45, src, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('exhibit--Avatar', props.prefixCls);
  return (
    <div className={prefixCls}>
      <Avatar size={size} src={src} icon={<UserOutlined />} />
    </div>
  );
};

export default Index;
