import React, { useState } from 'react';
import { Button } from 'antd';
import { Promise, Utils } from '@hocgin/ui';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormLayoutType } from '@ant-design/pro-form/lib/components/SchemaForm';
import { UseAction } from '@/Promise/components/ArchiveSchemaConfig/type';
import { useBoolean, useRequest } from 'ahooks';

type ConfigType = {
  /**
   * 默认参数
   */
  defaultParams?: any;
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
    defaultParams,
    useAction,
    title,
    layoutType = 'ModalForm',
    trigger,
    isUpdate = false,
    columns = [],
    ...rest
  } = config;
  let [initial, setInitial] = useState(false);

  let submitRequest = useRequest(useAction!.submit, {
    ...defaultParams,
    manual: true,
  });

  let triggerEl = trigger ? (
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

  return (
    <Promise.ArchiveSchema
      layoutType={layoutType}
      params={{ initial }}
      title={title}
      trigger={triggerEl}
      onVisibleChange={(visible) => setInitial(true)}
      onFinish={async (values: any) => submitRequest.run(values)}
      request={async (params: Record<string, any>, props: any) =>
        initial && useAction?.initialValues(params)
      }
      columns={columns}
      {...rest}
    />
  );
};

export default ArchiveSchemaConfig;
