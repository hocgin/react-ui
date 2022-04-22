import React from 'react';
import { Empty as AntdEmpty } from 'antd';
import { ConfigContext } from '@/ConfigProvider';

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
