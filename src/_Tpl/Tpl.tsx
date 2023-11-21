import React from 'react';
import { ConfigContext } from '@/ConfigProvider';
import classnames from 'classnames';
import useStyle from './style';

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  defaultParams?: any;
}> = ({ ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('tpl', props.prefixCls);
  let { styles } = useStyle({ prefixCls });
  console.log('styles', styles);

  return (
    <div className={classnames(`${prefixCls}-tpl`)}>
      <div className={classnames(`${prefixCls}-color`)}>加载中</div>
    </div>
  );
};

export default Index;
