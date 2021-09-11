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
};

export interface ArchiveSchemaConfigProps {
  /**
   * 配置
   */
  config: ConfigType;
}

// @formatter: off
const ArchiveSchemaConfig: React.FC<ArchiveSchemaConfigProps> = ({ config = {} }) => {
// @formatter: on
  let isUpdate = Utils.Lang.isNotNull(config?.id);
  let onFinish = async (values: any) => {
    useRequest(() => Service.submit(isUpdate, config.action, config.id, values));
  };
  let initialValues = async () => {
    let init = config?.init ?? true;
    let result = {};
    if (isUpdate && init) {
      let resp = await Service.initialValues(config?.action, config?.id);
      if (Utils.Ui.isSuccess(resp)) {
        result = { ...result, ...resp?.data };
      }
    }
    return result;
  };

  return (
    <Promise.ArchiveSchema
      layoutType={config?.layoutType || 'ModalForm'}
      title={config?.title}
      trigger={
        isUpdate ? (
          <Button type='primary'>
            <PlusOutlined />
            修改
          </Button>
        ) : (
          <Button type='primary'>
            <PlusOutlined />
            新建
          </Button>
        )
      }
      onFinish={onFinish}
      request={initialValues}
      columns={config.columns || []}
    />
  );
};

export default ArchiveSchemaConfig;
