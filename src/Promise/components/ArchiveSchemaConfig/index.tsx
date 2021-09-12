import React from 'react';
import { Button } from 'antd';
import { Promise, Utils } from '@hocgin/ui';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from '@@/plugin-request/request';
import { ProFormLayoutType } from '@ant-design/pro-form/lib/components/SchemaForm';
import Service from './service';

type ConfigType = {
  /**
   * 唯一标记
   */
  id?: number | string | undefined;
  /**
   * 更新模式是否需要初始化参数,默认为:true
   */
  init?: boolean;
  /**
   * 地址
   */
  action: string;
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
    id,
    action,
    title,
    layoutType = 'ModalForm',
    trigger,
    columns = [],
    ...rest
  } = config;
  let isUpdate = Utils.Lang.isNotNull(id);
  let onFinish = async (values: any) => {
    await Service.submit(isUpdate, action, id, values);
  };
  let initialValues = async () => {
    let init = config?.init ?? true;
    let result = {};
    if (isUpdate && init) {
      let resp = await Service.initialValues(action, id);
      if (Utils.Ui.isSuccess(resp)) {
        result = { ...result, ...resp?.data };
      }
    }
    return result;
  };

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
      title={title}
      trigger={triggerEl}
      onFinish={onFinish}
      request={initialValues}
      columns={columns}
      {...rest}
    />
  );
};

export default ArchiveSchemaConfig;
