import React, { useState } from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { Option } from '@/Utils/types/rt-grass';
import { useMount, useRequest } from 'ahooks';
import { UseAction } from './type';

interface CheckboxProps {
  /**
   * 请求
   */
  useAction: UseAction;
}

// @formatter: off
const Checkbox: React.FC<CheckboxProps> = ({ useAction, ...rest }) => {
  // @formatter: on
  let [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  let { run, loading } = useRequest(useAction.initialValues, {
    manual: true,
    onSuccess: (data: Option[]) => {
      setOptions(
        data.map(({ key, value }: Option) => ({
          label: key,
          value,
        })),
      );
    },
  });

  useMount(() => run());

  return <AntdCheckbox.Group options={options} {...rest} />;
};
export default Checkbox;
