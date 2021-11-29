import React from 'react';
import { Button } from 'antd';
import { Promise, Utils } from '@hocgin/ui';
import { PlusOutlined } from '@ant-design/icons';
import { ProFormLayoutType } from '@ant-design/pro-form/lib/components/SchemaForm';
import { UseAction } from '@/Promise/components/ArchiveSchemaConfig/type';
import { useRequest } from 'ahooks';

type ConfigType = {
  /**
   * 更新模式是否需要初始化参数,默认为:true
   */
  init?: boolean;
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
    init = true,
    columns = [],
    ...rest
  } = config;
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

  let request = async (params: Record<string, any>, props: any) => {
    return useAction?.initialValues(params);
  };
  return (
    <Promise.ArchiveSchema
      layoutType={layoutType}
      title={title}
      trigger={triggerEl}
      onFinish={async (values: any) => submitRequest.run(values)}
      request={request}
      columns={columns}
      {...rest}
    />
  );
};

export default ArchiveSchemaConfig;
