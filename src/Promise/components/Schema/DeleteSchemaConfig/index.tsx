import React, { useState } from 'react';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { UseAction } from './type';
import { ID } from '@/_types';

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
  /**
   * 标题
   */
  title?: string;
};

// @formatter: off
const DeleteSchemaConfig: React.FC<{
  /**
   * 配置
   */
  config: ConfigType;
}> = ({ config = {} }) => {
  // @formatter: on
  let {
    id = [],
    useAction,
    title,
    trigger = <a rel='noopener noreferrer'>删除</a>,
  } = config;
  let [visible, setVisible] = useState(false);
  let [loading, setLoading] = useState(false);

  let onConfirm = async () => {
    setLoading(true);
    let isOk = (await useAction!.delete(id)) ?? true;
    if (isOk) {
      setVisible(false);
    }
    setLoading(false);
  };

  let triggerEl =
    trigger && React.cloneElement(trigger, { onClick: () => setVisible(true) });
  return (
    <>
      {triggerEl}
      <Modal
        visible={visible}
        width={400}
        confirmLoading={loading}
        closable={false}
        title={title}
        onCancel={() => setVisible(false)}
        onOk={onConfirm}
      >
        <ExclamationCircleOutlined />
        {`请确认是否删除 ${id.length} 条数据(无法恢复)?`}
      </Modal>
    </>
  );
};
export default DeleteSchemaConfig;
