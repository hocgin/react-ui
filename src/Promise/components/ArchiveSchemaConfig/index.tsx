import React, { useState } from 'react';
import { Button } from 'antd';
import { Promise } from '@hocgin/ui';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormLayoutType } from '@ant-design/pro-form/lib/components/SchemaForm';
import { UseAction } from './type';

type ConfigType = {
  /**
   * 是否更新模式
   */
  isUpdate?: boolean;
  /**
   * 地址
   */
  useAction: UseAction;
  /**
   * 布局
   */
  layoutType?: ProFormLayoutType;
  /**
   * 字段
   */
  columns: any[];
  /**
   * 标题
   */
  title?: string;
  /**
   * 触发
   */
  trigger?: JSX.Element;
};

export interface ArchiveSchemaConfigProps {
  /**
   * 配置
   */
  config: ConfigType;
}

// @formatter: off
const ArchiveSchemaConfig: React.FC<ArchiveSchemaConfigProps> = ({
  config = {},
}) => {
  // @formatter: on
  let {
    useAction,
    title,
    layoutType = 'ModalForm',
    trigger,
    isUpdate = false,
    columns = [],
    ...rest
  } = config;
  let [initial, setInitial] = useState(false);

  trigger = trigger ? (
    trigger
  ) : isUpdate ? (
    <Button type="primary" icon={<PlusOutlined />}>
      修改
    </Button>
  ) : (
    <Button type="primary" icon={<PlusOutlined />}>
      新建
    </Button>
  );

  let triggerEl = trigger;

  return (
    <Promise.ArchiveSchema
      layoutType={layoutType}
      params={{ initial }}
      title={title}
      onVisibleChange={() => setInitial(true)}
      trigger={triggerEl}
      onFinish={async (values: any) => {
        return await useAction!.submit(values);
      }}
      request={async (params: Record<string, any>, props: any) => {
        if (initial && useAction?.initialValues) {
          return useAction.initialValues(params);
        }
        return {};
      }}
      columns={columns}
      {...rest}
    />
  );
};

export default ArchiveSchemaConfig;
