import React from 'react';
import { Promise, Utils } from '@hocgin/ui';
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
  /**
   * 触发
   */
  trigger?: JSX.Element;
};

export interface ExhibitSchemaConfigProps {
  /**
   * 配置
   */
  config: ConfigType;
}

// @formatter: off
const ExhibitSchemaConfig: React.FC<ExhibitSchemaConfigProps> = ({
  config,
}) => {
  // @formatter: on
  let { action, title, trigger, columns = [], ...rest } = config;
  let initialValues = async () => {
    let resp = await Service.initialValues(action);
    let result = {};
    if (Utils.Ui.isSuccess(resp)) {
      result = { ...resp?.data };
    }
    return resp;
  };

  return (
    <Promise.ExhibitSchema
      title={title}
      trigger={trigger}
      request={initialValues}
      columns={columns}
      {...rest}
    />
  );
};

export default ExhibitSchemaConfig;
