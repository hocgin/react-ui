import React from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import Service from './service';
import { Option } from '@/Archive/components/interface';
import { useRequest } from 'ahooks';

interface CheckboxProps {
  /**
   * 请求地址
   */
  action: string;
}

// @formatter: off
const Checkbox: React.FC<CheckboxProps> = ({ action, ...rest }) => {
  // @formatter: on
  let { data = [] } = useRequest(() => Service.initialValues(action));
  return (
    <AntdCheckbox.Group
      options={(data || []).map(({ key, value }: Option) => ({
        label: key,
        value,
      }))}
      {...rest}
    />
  );
};
export default Checkbox;
