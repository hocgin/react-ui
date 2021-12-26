import React from 'react';
import styles from './Link.less';
import { Tooltip } from 'antd';
import { Utils } from '@hocgin/ui';
import { LinkOutlined } from '@ant-design/icons';

export interface SiteProps {
  /**
   * 链接地址
   */
  url?: string;
  /**
   * 链接标题(如果没有会读取链接地址)
   */
  title?: string;
}

class Index extends React.Component<SiteProps> {
  static defaultProps = {};

  render(): JSX.Element {
    let { url, title } = this.props;
    let fullUrl = Utils.Lang.suppleUrlPrefix(url) || '#';
    return (
      <div>
        <a href={fullUrl} className={styles.link} target="_blank">
          <Tooltip placement="top" color="#383838" title={fullUrl}>
            <LinkOutlined />
          </Tooltip>
          <span className={styles.linkText}>{title || url}</span>
        </a>
      </div>
    );
  }
}

export default Index;
