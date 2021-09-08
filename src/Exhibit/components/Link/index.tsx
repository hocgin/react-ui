import React from 'react';
import styles from './index.less';
import { Tooltip, Popover, Avatar } from 'antd';
import { Utils } from '@/index';
import { FileImageOutlined, LinkOutlined, FileUnknownOutlined } from '@ant-design/icons';

export interface LinkProps {
  /**
   * 链接地址
   */
  url?: string;
  /**
   * 链接标题(如果没有会读取链接地址)
   */
  title?: string;
}

interface LinkState {
}

class Index extends React.Component<LinkProps, LinkState> {
  static defaultProps = {};

  render(): JSX.Element {
    let { url, title } = this.props;
    let fullUrl = Utils.Lang.suppleUrlPrefix(url) || '#';
    let isImg = Utils.Lang.isImgUrl(fullUrl);
    return (<div>

      <a href={fullUrl} className={styles.link} target='_blank'>{isImg ? (
        <Popover content={<Avatar size={200} icon={<FileUnknownOutlined />} src={fullUrl} />}>
          <FileImageOutlined />
        </Popover>) : (<Tooltip placement='top' color='#383838' title={fullUrl}>
        <LinkOutlined />
      </Tooltip>)}&nbsp;{title || url}</a>
    </div>);
  }
}

export default Index;
