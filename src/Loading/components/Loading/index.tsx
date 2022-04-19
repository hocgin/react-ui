import React from 'react';
import { Spin } from 'antd';
import './index.less';
import { ConfigContext } from '@/config-provider';

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
}> = (props) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('loading', props.prefixCls);
  return (
    <div className={`${prefixCls}-loading`}>
      <Spin delay={300} />
    </div>
  );
};

export default Index;
