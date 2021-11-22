import React from 'react';
import styles from './Link.less';
import { Tooltip, Popover, Avatar } from 'antd';
import { Utils } from '@hocgin/ui';
import {
  FileImageOutlined,
  LinkOutlined,
  FileUnknownOutlined,
} from '@ant-design/icons';

export interface FileProps {
  /**
   * 链接地址
   */
  url?: string;
  /**
   * 链接标题(如果没有会读取链接地址)
   */
  title?: string;
  /**
   * 文件类型
   */
  type?: string;
}

class Index extends React.Component<FileProps> {
  static defaultProps = {
    type: 'auto',
  };

  render(): JSX.Element {
    let { url, title } = this.props;
    let fullUrl = Utils.Lang.suppleUrlPrefix(url) || '#';
    return (
      <div>
        <a href={fullUrl} className={styles.link} target='_blank'>
          <Popover content={<Avatar size={200} icon={<FileUnknownOutlined />} src={fullUrl} />}>
            <FileImageOutlined />
          </Popover>
          &nbsp;{title || url}
        </a>
      </div>
    );
  }
}

export default Index;
