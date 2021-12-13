import React from 'react';
import ExhibitSchema from './exhibit-schema';
import styles from './index.less';
import { UseAction } from './type';
import classnames from 'classnames';

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
  className?: string;
  /**
   * 配置
   */
  config: ConfigType;
}

// @formatter: off
const ExhibitSchemaConfig: React.FC<ExhibitSchemaConfigProps> = ({
  className,
  config,
}) => {
  // @formatter: on
  let { useAction, title, trigger, columns = [], ...rest } = config;

  return (
    <ExhibitSchema
      className={classnames(styles.component, className)}
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
    />
  );
};

export default ExhibitSchemaConfig;
