import React from 'react';
import { Utils, Dom } from '@hocgin/ui';
import { CloudDownloadOutlined } from '@ant-design/icons';
import { ConfigContext } from '@/config-provider';
import './index.less';

export interface DownloadProps {
  /**
   * 链接地址
   */
  url?: string;
  /**
   * 链接标题(如果没有会读取链接地址)
   */
  title?: string;
  prefixCls?: string;
}

const Index: React.FC<DownloadProps> = ({ url, title, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('link', props.prefixCls);
  let fullUrl = Utils.Lang.suppleUrlPrefix(url) || '#';
  return (
    <div>
      <a
        onClick={(e: any) => Dom.downloadUrl(e, { url: fullUrl })}
        className={prefixCls}
      >
        <CloudDownloadOutlined />
        &nbsp;下载
      </a>
    </div>
  );
};
export default Index;
