import React from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UseAction } from './type';
import { ID } from '@/Utils/interface';

type ConfigType = {
  /**
   * 请求
   */
  useAction: UseAction;
  /**
   * 删除数据
   */
  id: ID[];
  /**
   * 触发点
   */
  trigger?: JSX.Element;
};

interface DeleteSchemaConfigProps {
  /**
   * 配置
   */
  config: ConfigType;
}

// @formatter: off
const DeleteSchemaConfig: React.FC<DeleteSchemaConfigProps> = ({
  config = {},
}) => {
  // @formatter: on
  let {
    id = [],
    useAction,
    trigger = <a rel="noopener noreferrer">删除</a>,
    ...rest
  } = config;

  let showConfirm = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: `请确认是否删除 ${id.length} 条数据(无法恢复)?`,
      onOk: async () => {
        await useAction!.delete(id);
      },
    });
  };
  let triggerEl =
    trigger && React.cloneElement(trigger, { onClick: showConfirm });
  return <>{triggerEl}</>;
};
export default DeleteSchemaConfig;
