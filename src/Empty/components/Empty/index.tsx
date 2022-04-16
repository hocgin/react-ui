import React from 'react';
import { Empty as AntdEmpty } from 'antd';
import './index.less';
import { ConfigContext } from '@/config-provider';

export const Empty: React.FC<{
  prefixCls?: string;
  className?: string;
  type?: 'normal';
  description?: string;
}> = ({ description = '', ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('empty', props.prefixCls);
  return (
    <div className={prefixCls}>
      <AntdEmpty description={description} />
    </div>
  );
};
