import React, { useState } from 'react';
import { Checkbox as AntdCheckbox } from 'antd';
import { Option } from '@/_types';
import { useMount, useRequest } from 'ahooks';
import { UseAction } from './type';
import { LangKit } from '@/_utils';

// @formatter: off
const Checkbox: React.FC<{
  /**
   * 请求
   */
  useAction: UseAction;
}> = ({ useAction, ...rest }) => {
  // @formatter: on
  let [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  let service = LangKit.nilService(useAction?.initialValues, []);
  let { run, loading } = useRequest(service, {
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
