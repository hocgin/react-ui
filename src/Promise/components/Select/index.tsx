import React, { useState } from 'react';
import { Select } from 'antd';
import { Option } from '@/Utils/types/rt-grass';
import { UseAction } from '@/Promise/components/Select/type';
import { useMount, useRequest } from 'ahooks';

interface TreeSelectProps {
  /**
   * 请求
   */
  useAction: UseAction;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 选择提示
   */
  placeholder?: string;
}

const Index: React.FC<TreeSelectProps> = ({
                                            multiple = true,
                                            placeholder = '请选择',
                                            useAction,
                                            ...rest
                                          }) => {
  let [data, setData] = useState<Option[]>([]);
  let style = { minWidth: '5em' };

  let { run, loading } = useRequest(useAction.initialValues, {
    manual: true,
    onSuccess: (data: Option[]) => setData(data || []),
  });

  useMount(() => run());

  return (
    <Select loading={loading}
            allowClear
            style={style}
            mode={multiple ? 'multiple' : undefined}
            placeholder={placeholder}
            {...rest}>
      {data.map(({ key, value }: Option) => (
        <Select.Option key={`${value}`} value={value}>
          {key}
        </Select.Option>
      ))}
    </Select>
  );
};

export default Index;
