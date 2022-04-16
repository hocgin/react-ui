import React from 'react';
import { Statistic } from 'antd';
import { ConfigContext } from '@/config-provider';
import './index.less';

const Index: React.FC<{
  prefixCls?: string;
  precision?: number;
  value?: number | string;
}> = ({ precision = 2, value = '-.--', ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('money', props.prefixCls);
  return (
    <div className={prefixCls}>
      <Statistic
        valueStyle={{ color: '#E86A5E' } as any}
        prefix={'¥'}
        value={value}
        precision={precision}
      />
    </div>
  );
};
export default Index;
