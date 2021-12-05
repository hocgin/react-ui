import React, { useState } from 'react';
import { Button } from 'antd';
import ArchiveSchema from './archive-schema';
import { PlusOutlined } from '@ant-design/icons';
import type { ProFormLayoutType } from '@ant-design/pro-form';
import { UseAction } from './type';

type ConfigType = {
  /**
   * 是否更新模式
   */
  isUpdate?: boolean;
  /**
   * 地址
   */
  useAction: UseAction;
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
  /**
   * 触发
   */
  trigger?: JSX.Element;
};

// @formatter: off
const ArchiveSchemaConfig: React.FC<{
  key?: any,
  /**
   * 配置
   */
  config: ConfigType;
}> = ({ key, config = {} }) => {
  // @formatter: on
  let {
    useAction,
    title,
    layoutType = 'ModalForm',
    trigger,
    isUpdate = false,
    columns = [],
    ...rest
  } = config;
  let [initial, setInitial] = useState(false);

  let triggerEl = trigger ? (
    trigger
  ) : isUpdate ? (
    <Button type='primary' icon={<PlusOutlined />}>
      修改
    </Button>
  ) : (
    <Button type='primary' icon={<PlusOutlined />}>
      新建
    </Button>
  );

  let modalProps = {};
  if (layoutType === 'ModalForm') {
    modalProps = {
      ...modalProps,
      onVisibleChange: (visible: boolean) => !initial && setInitial(true),
    };
    console.log(`ModalForm`, key, config, modalProps, initial);
  }

  return <ArchiveSchema layoutType={layoutType}
                        params={{ initial }}
                        title={title}
                        trigger={triggerEl}
                        columns={columns}
                        onFinish={(values: any) => useAction!.submit(values) ?? true}
                        request={async (params: Record<string, any>, props: any) => {
                          if (initial && useAction?.initialValues) {
                            return useAction.initialValues(params);
                          }
                          return {};
                        }}
                        {...modalProps}
                        {...rest} />;
};

export default ArchiveSchemaConfig;
