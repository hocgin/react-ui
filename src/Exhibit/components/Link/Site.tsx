import React from 'react';
import { Tooltip } from 'antd';
import { LangKit } from '@/_utils';
import { LinkOutlined } from '@ant-design/icons';
import { ConfigContext } from '@/ConfigProvider';

export interface SiteProps {
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

const Index: React.FC<SiteProps> = ({ url, title, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('link', props.prefixCls);
  let fullUrl = LangKit.suppleUrlPrefix(url) || '#';
  return (
    <div>
      <a href={fullUrl} className={prefixCls} target="_blank">
        <Tooltip placement="top" color="#383838" title={fullUrl}>
          <LinkOutlined />
        </Tooltip>
        <span className={'linkText'}>{title || url}</span>
      </a>
    </div>
  );
};

export default Index;
