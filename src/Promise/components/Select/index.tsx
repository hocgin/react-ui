import React, { useState } from 'react';
import { Select } from 'antd';
import { LangKit } from '@/_utils';
import { Option } from '@/_types';
import { UseAction } from './type';
import { useMount, useRequest } from 'ahooks';

import { ConfigContext } from '@/ConfigProvider';

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
  prefixCls?: string;
}> = ({ multiple = false, placeholder = '请选择..', useAction, ...props }) => {
  let [data, setData] = useState<Option[]>([]);
  let service = LangKit.nilService(useAction?.initialValues, []);
  let { run, loading } = useRequest(service, {
    manual: true,
    onSuccess: (data: Option[]) => setData(data || []),
  });

  useMount(() => run());
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('promise--Select', props.prefixCls);
  return (
    <Select
      className={prefixCls}
      loading={loading}
      allowClear
      mode={multiple ? 'multiple' : undefined}
      placeholder={placeholder}
      {...props}
    >
      {data.map(({ key, value }: Option) => (
        <Select.Option key={`${value}`} value={value}>
          {key}
        </Select.Option>
      ))}
    </Select>
  );
};

export default Index;
