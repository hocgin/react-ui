import React from 'react';
import { Radio } from 'antd';
import Service from './service';
import { Option } from '@/Archive/components/interface';
import { useRequest } from 'ahooks';

interface RadioButtonProps {
  /**
   * 请求地址
   */
  action: string;
}

// @formatter: off
const RadioButton: React.FC<RadioButtonProps> = ({ action, ...rest }) => {
  // @formatter: on
  let { data = [] } = useRequest(() => Service.initialValues(action));
  return (
    <Radio.Group {...rest}>
      {(data || []).map(({ key, value }: Option) => (
        <Radio.Button key={`${value}`} value={value}>
          {key}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
export default RadioButton;
