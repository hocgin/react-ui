import React from 'react';
import { Radio as AntdRadio } from 'antd';
import Service from './service';
import { Option } from '@/Archive/components/interface';
import { useRequest } from '@@/plugin-request/request';

interface RadioProps {
  /**
   * 请求地址
   */
  action: string;
}

// @formatter: off
const Radio: React.FC<RadioProps> = ({ action, ...rest }) => {
// @formatter: on
  let { data = [] } = useRequest(() => Service.initialValues(action));
  return (<AntdRadio.Group options={(data || []).map(({ key, value }: Option) => ({ label: key, value }))}
                           {...rest} />);
};
export default Radio;
