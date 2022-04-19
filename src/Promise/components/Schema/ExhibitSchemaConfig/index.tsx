import React from 'react';
import ExhibitSchema from './exhibit-schema';
import styles from './index.less';
import { UseAction } from './type';
import classnames from 'classnames';
import { ConfigContext } from '@/config-provider';

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

// @formatter: off
const ExhibitSchemaConfig: React.FC<{
  prefixCls?: string;
  className?: string;
  config: ConfigType;
}> = ({ className, config, ...props }) => {
  // @formatter: on
  let { useAction, title, trigger, columns = [], ...rest } = config;
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls(
    'promise-schema--ExhibitSchemaConfig',
    props.prefixCls,
  );
  return (
    <ExhibitSchema
      className={classnames(prefixCls, className)}
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
