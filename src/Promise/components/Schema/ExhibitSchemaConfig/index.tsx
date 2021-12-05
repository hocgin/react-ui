import React from 'react';
import ExhibitSchema from './exhibit-schema';
import { UseAction } from './type';

type ConfigType = {
  /**
   * 请求
   */
  useAction: UseAction;
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
  let { useAction, title, trigger, columns = [], ...rest } = config;

  return <ExhibitSchema
    title={title}
    trigger={trigger}
    columns={columns}
    request={async (params: Record<string, any>) =>
      useAction?.initialValues(params).then((data: any) => ({
        success: true,
        data,
      }))
    }
    {...rest}
  />;
};

export default ExhibitSchemaConfig;
