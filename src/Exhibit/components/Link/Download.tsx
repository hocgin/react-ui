import React from 'react';
import styles from './Link.less';
import { Utils, Dom } from '@hocgin/ui';
import { CloudDownloadOutlined } from '@ant-design/icons';

export interface DownloadProps {
  /**
   * 链接地址
   */
  url?: string;
  /**
   * 链接标题(如果没有会读取链接地址)
   */
  title?: string;
}

class Index extends React.Component<DownloadProps> {
  static defaultProps = {};

  render(): JSX.Element {
    let { title } = this.props;
    let fullUrl = this.fullUrl;
    return (
      <div>
        <a onClick={this.onClickDownload} className={styles.link}>
          <CloudDownloadOutlined />
          &nbsp;下载
        </a>
      </div>
    );
  }

  onClickDownload = (e: any) => {
    Dom.downloadUrl(e, { url: this.fullUrl });
  };

  get fullUrl() {
    let { url } = this.props;
    return Utils.Lang.suppleUrlPrefix(url);
  }
}

export default Index;
