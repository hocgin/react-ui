import React, { useState } from 'react';
import { Radio } from 'antd';
import { Option } from '@/Utils/types/rt-grass';
import { useRequest, useMount } from 'ahooks';
import { UseAction } from './type';
import { Utils } from '@/index';

interface RadioButtonProps {
  /**
   * 请求
   */
  useAction: UseAction;
}

// @formatter: off
const RadioButton: React.FC<RadioButtonProps> = ({ useAction, ...rest }) => {
  // @formatter: on
  let [data, setData] = useState<Option[]>([]);

  let service = Utils.Lang.nilService(useAction?.initialValues, []);
  let { run, loading } = useRequest(service, {
    manual: true,
    onSuccess: (data: Option[]) => setData(data),
  });

  useMount(() => run());

  return (
    <Radio.Group {...rest}>
      {data.map(({ key, value }: Option) => (
        <Radio.Button key={`${value}`} value={value}>
          {key}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};
export default RadioButton;
