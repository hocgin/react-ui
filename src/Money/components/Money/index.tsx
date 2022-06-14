import React, { useEffect, useState } from 'react';
import { Statistic } from 'antd';
import { ConfigContext } from '@/ConfigProvider';
import TweenOne from 'rc-tween-one';
import Children from 'rc-tween-one/lib/plugin/ChildrenPlugin';

TweenOne.plugins.push(Children);

const Index: React.FC<{
  prefixCls?: string;
  precision?: number;
  value?: number;
}> = ({ precision = 2, value = '-.--', ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let [animation, setAnimation] = useState<any>();
  useEffect(() => {
    setAnimation({
      Children: {
        value: value,
        floatLength: 2,
        formatMoney: true,
      },
      duration: 1000,
    });
  });

  let prefixCls = getPrefixCls('money', props.prefixCls);
  return (
    <div className={prefixCls}>
      <span style={{ color: '#E86A5E', marginRight: 2 } as any}>¥</span>
      <span
        style={{ color: '#E86A5E', fontWeight: 400, fontSize: '1.2em' } as any}
      >
        <TweenOne animation={animation}>0</TweenOne>
      </span>
    </div>
  );
};
export default Index;
