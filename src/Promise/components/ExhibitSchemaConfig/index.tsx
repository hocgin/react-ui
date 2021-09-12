import React from 'react';
import { Button } from 'antd';
import { Promise, Utils } from '@hocgin/ui';
import { PlusOutlined } from '@ant-design/icons';
import { useRequest } from '@@/plugin-request/request';
import { ProFormLayoutType } from '@ant-design/pro-form/lib/components/SchemaForm';
import Service from './service';

type ConfigType = {
  /**
   * 地址
   */
  action: string;
  /**
   * 字段
   */
  columns: any[];
  /**
   * 标题
   */
  title?: string;
};

export interface ExhibitSchemaConfigProps {
  /**
   * 配置
   */
  config: ConfigType;
}

// @formatter: off
const ExhibitSchemaConfig: React.FC<ExhibitSchemaConfigProps> = ({ config = {} }) => {
// @formatter: on
  let initialValues = async () => {
    let resp = await Service.initialValues(config?.action);
    let result = {};
    if (Utils.Ui.isSuccess(resp)) {
      result = {  ...resp?.data };
    }
    console.log('result', result);
    return resp;
  };

  return (
    <Promise.ExhibitSchema title={config?.title}
      request={initialValues}
      columns={config.columns || []}
    />
  );
};

export default ExhibitSchemaConfig;
