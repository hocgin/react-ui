import React, { useState } from 'react';
import { Select, Spin, Avatar } from 'antd';
import { Utils } from '@hocgin/ui';
import { SearchOption } from '@/Utils/types/rt-grass';
import { UseAction } from './type';
import styles from './index.less';
import { UserOutlined } from '@ant-design/icons';
import { useUpdateEffect, useRequest, useMount } from 'ahooks';

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
  /**
   * 默认值
   */
  defaultValue?: string;
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
  ...rest
}) => {
  let [data, setData] = useState<SearchOption[]>(options);
  let [keyword, setKeyword] = useState<string>();
  let style = { minWidth: '10em', width: '100%' };
  let service = Utils.Lang.nilService(useAction?.initialValues, []);
  let { run, loading } = useRequest(service, {
    manual: true,
    onSuccess: (data: SearchOption[]) => setData(data || []),
  });

  useUpdateEffect(() => run(keyword), [keyword]);

  return (
    <Select
      defaultValue={defaultValue}
      loading={loading}
      showSearch
      onChange={onChange}
      showArrow={false}
      filterOption={false}
      allowClear
      style={style}
      mode={multiple ? 'multiple' : undefined}
      notFoundContent={loading ? <Spin size="small" /> : null}
      onSearch={setKeyword}
      placeholder={placeholder}
      optionLabelProp="label"
      {...rest}
    >
      {data.map(({ key, image, description, value }: SearchOption) => (
        <Select.Option value={value} label={key}>
          <OptionView title={key} image={image} description={description} />
        </Select.Option>
      ))}
    </Select>
  );
};

const OptionView: React.FC<{
  title?: string;
  image?: string;
  description?: string;
}> = ({ title, image, description }) => {
  return (
    <div className={styles.optionView}>
      {image && (
        <Avatar className={styles.image} size={32} icon={<UserOutlined />} />
      )}
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default Index;
