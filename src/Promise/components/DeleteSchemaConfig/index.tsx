import React from 'react';
import { Radio as AntdRadio, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Service from './service';

interface DeleteSchemaConfigProps {
  /**
   * 请求地址
   */
  action: string;
  /**
   * 删除数据
   */
  id: any;
  /**
   * 触发点
   */
  trigger?: JSX.Element;
}

// @formatter: off
const DeleteSchemaConfig: React.FC<DeleteSchemaConfigProps> = ({
  id,
  action,
  trigger = <a rel="noopener noreferrer">删除</a>,
  ...rest
}) => {
  // @formatter: on
  let showConfirm = () => {
    Modal.confirm({
      icon: <ExclamationCircleOutlined />,
      content: `请确认是否删除 ${id.length} 条数据(无法恢复)?`,
      onOk: async () => {
        let resp = await Service.deletes(action, id);
      },
    });
  };
  let triggerEl =
    trigger &&
    React.cloneElement(trigger, {
      onClick: showConfirm,
    });
  return <>{triggerEl}</>;
};
export default DeleteSchemaConfig;
