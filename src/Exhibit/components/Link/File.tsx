import React from 'react';
import { Popover, Avatar } from 'antd';
import Utils from '@/Utils';
import { FileImageOutlined, FileUnknownOutlined } from '@ant-design/icons';

import { ConfigContext } from '@/ConfigProvider';

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
  prefixCls?: string;
}

const Index: React.FC<FileProps> = ({
  url,
  type = 'auto',
  title,
  ...props
}) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('link', props.prefixCls);
  let fullUrl = Utils.Lang.suppleUrlPrefix(url) || '#';
  return (
    <div>
      <a href={fullUrl} className={prefixCls} target="_blank">
        <Popover
          content={
            <Avatar size={200} icon={<FileUnknownOutlined />} src={fullUrl} />
          }
        >
          <FileImageOutlined />
        </Popover>
        &nbsp;{title || url}
      </a>
    </div>
  );
};

export default Index;
