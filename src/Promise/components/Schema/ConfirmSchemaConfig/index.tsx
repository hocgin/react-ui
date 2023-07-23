import React, { useMemo } from 'react';
import { Button, Popconfirm } from 'antd';
import { UseAction } from './type';

interface ConfigType {
  /**
   * 地址
   */
  useAction: UseAction;
  /**
   * 标题
   */
  title?: string;
  description?: string;
  /**
   * 触发
   */
  trigger?: JSX.Element | string;
}

export const ConfirmSchemaConfig: React.FC<{
  className?: string;
  config: ConfigType;
}> = ({ config }, ref) => {
  let { useAction, title, trigger, ...rest } = config;
  let triggerEl = useMemo(() => {
    if (typeof trigger === 'string') {
      return <Button type="primary">{trigger}</Button>;
    } else if (typeof trigger === 'object') {
      return trigger;
    } else {
      return <Button type="primary">触发</Button>;
    }
  }, [trigger]);
  return (
    <Popconfirm
      title={config?.title}
      description={config?.description}
      onConfirm={() => useAction?.trigger()}
    >
      {triggerEl}
    </Popconfirm>
  );
};
