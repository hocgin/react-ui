import React from 'react';
import { ConfigProvider } from '@hocgin/ui';
import classnames from 'classnames';
import './style';

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  defaultParams?: any;
}> = ({ ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  let prefixCls = getPrefixCls('tpl', props.prefixCls);
  return (
    <div className={classnames(`${prefixCls}`)}>
      <div className={classnames(`${prefixCls}-color`)}>加载中</div>
    </div>
  );
};

export default Index;
