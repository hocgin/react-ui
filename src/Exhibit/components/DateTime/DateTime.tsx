import React from 'react';
import { ClockCircleOutlined } from '@ant-design/icons';
import { ConfigContext } from '@/ConfigProvider';
import { FormatKit } from '@/_utils';

const Index: React.FC<{
  prefixCls?: string;
  value: string | number;
}> = ({ value, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('exhibit--DateTime', props.prefixCls);

  let getValue = () => {
    let text = value;
    let valueType = typeof value;
    if (valueType === 'string') {
      text = value;
    } else if (valueType === 'number') {
      text = FormatKit.toDateStr(value as number);
    }
    return text;
  };

  return (
    <div className={prefixCls}>
      <ClockCircleOutlined />
      <span className={`${prefixCls}-text`}>{getValue()}</span>
    </div>
  );
};

export default Index;
