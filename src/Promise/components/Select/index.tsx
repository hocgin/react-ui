import React, { useState } from 'react';
import { Select } from 'antd';
import { Utils } from '@hocgin/ui';
import { Option } from '@/Utils/types/rt-grass';
import { UseAction } from './type';
import { useMount, useRequest } from 'ahooks';

const Index: React.FC<{
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
}> = ({ multiple = false, placeholder = '请选择', useAction, ...rest }) => {
  let [data, setData] = useState<Option[]>([]);
  let style = { minWidth: '5em' };
  let service = Utils.Lang.nilService(useAction?.initialValues, []);
  let { run, loading } = useRequest(service, {
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
