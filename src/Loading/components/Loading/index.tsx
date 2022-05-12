import React from 'react';
import { Spin } from 'antd';

import { ConfigContext } from '@/ConfigProvider';
import classnames from 'classnames';

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
}> = (props) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('loading', props.prefixCls);
  return (
    <div className={classnames(`${prefixCls}`, props.className)}>
      <Spin delay={300} />
    </div>
  );
};

export default Index;
