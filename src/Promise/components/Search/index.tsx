import React, { useState } from 'react';
import { Select } from 'antd';
import { Utils } from '@hocgin/ui';
import { Option } from '@/Utils/types/rt-grass';
import { UseAction } from './type';
import { useUpdateEffect, useRequest } from 'ahooks';

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
}> = ({ multiple = false, placeholder = '请选择..', useAction, ...rest }) => {
  let [data, setData] = useState<Option[]>([]);
  let [keyword, setKeyword] = useState<string>();
  let style = { minWidth: '10em' };
  let service = Utils.Lang.nilService(useAction?.initialValues, []);
  let { run, loading } = useRequest(service, {
    manual: true,
    onSuccess: (data: Option[]) => setData(data || []),
  });

  useUpdateEffect(() => run(keyword), [keyword]);

  return (
    <Select
      loading={loading}
      showSearch
      showArrow={false}
      filterOption={false}
      allowClear
      style={style}
      mode={multiple ? 'multiple' : undefined}
      onSearch={setKeyword}
      placeholder={placeholder}
      {...rest}
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