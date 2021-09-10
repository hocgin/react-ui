import React from 'react';
import styles from './Avatar.less';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';

export interface AvatarProps {
  /**
   * 图片
   */
  src?: React.ReactNode | string;
  /**
   * 大小
   */
  size?: AvatarSize;
}

class Index extends React.Component<AvatarProps> {
  static defaultProps = {
    size: 45,
  };

  render() {
    let { src, size } = this.props;
    return (
      <div className={styles.component}>
        <Avatar size={size} src={src} icon={<UserOutlined />} />
      </div>
    );
  }
}
export default Index;
