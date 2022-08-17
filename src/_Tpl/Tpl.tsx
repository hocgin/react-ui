import React from 'react';
import { ConfigContext } from '@/ConfigProvider';
import classnames from 'classnames';

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  defaultParams?: any;
}> = ({ ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('tpl', props.prefixCls);
  return (
    <div className={classnames(`${prefixCls}`)}>
      <div className={classnames(`${prefixCls}-color`)}>加载中</div>
    </div>
  );
};

export default Index;
