import React, { useState } from 'react';
import { Select, Spin, Avatar } from 'antd';
import { LangKit } from '@/_utils';
import { SearchOption } from '@/_types';
import { UseAction } from './type';
import { UserOutlined } from '@ant-design/icons';
import { useUpdateEffect, useRequest } from 'ahooks';

import { ConfigContext } from '@/ConfigProvider';

const Index: React.FC<{
  prefixCls?: string;
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
  /**
   * 默认值
   */
  defaultValue?: string | any;
  /**
   * 变更值
   * @param values
   */
  onChange?: (values: any | any[]) => void;
  /**
   * 默认 options
   */
  options?: SearchOption[];
}> = ({
  multiple = false,
  placeholder = '请选择..',
  onChange,
  useAction,
  defaultValue,
  options = [],
  ...props
}) => {
  let [data, setData] = useState<SearchOption[]>(options);
  let [keyword, setKeyword] = useState<string>();
  let service = LangKit.nilService(useAction?.initialValues, []);
  let { run, loading } = useRequest(service, {
    manual: true,
    onSuccess: (data: SearchOption[]) => setData(data || []),
  });

  useUpdateEffect(() => run(keyword), [keyword]);

  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('promise--Search', props.prefixCls);
  return (
    <Select
      className={prefixCls}
      defaultValue={defaultValue}
      loading={loading}
      showSearch
      onChange={onChange}
      showArrow={false}
      filterOption={false}
      allowClear
      mode={multiple ? 'multiple' : undefined}
      notFoundContent={loading ? <Spin size="small" /> : null}
      onSearch={setKeyword}
      placeholder={placeholder}
      optionLabelProp="label"
      {...props}
    >
      {data.map(({ key, image, description, value }: SearchOption) => (
        <Select.Option key={value} value={value} label={key}>
          <OptionView title={key} image={image} description={description} />
        </Select.Option>
      ))}
    </Select>
  );
};

const OptionView: React.FC<{
  prefixCls?: string;
  title?: string;
  image?: string;
  description?: string;
}> = ({ title, image, description, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('promise--Search-OptionView', props.prefixCls);
  return (
    <div className={prefixCls}>
      {image && (
        <Avatar shape={'square'} className={'image'} size={32} icon={<UserOutlined />} />
      )}
      <div className={'info'}>
        <div className={'title'}>{title}</div>
        <div className={'description'}>{description}</div>
      </div>
    </div>
  );
};

export default Index;
