import React, { useContext } from 'react';
import ProProvider from '@ant-design/pro-provider';
import { BetaSchemaForm } from '@ant-design/pro-form';
import type { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import {
  SchemeColumns,
  handleSchemeColumns,
} from '../scheme';

// @formatter: off
const ArchiveSchema: React.FC<FormSchema> = ({
                                               columns,
                                               trigger,
                                               title,
                                               onFinish,
                                               params,
                                               request,
                                               layoutType,
                                               visible,
                                               onVisibleChange,
                                             }) => {
  // @formatter: on
  const values = useContext(ProProvider);

  let value = {
    ...values,
    valueTypeMap: {
      ...SchemeColumns,
    },
  };

  return (
    <ProProvider.Provider value={value}>
      <BetaSchemaForm columns={handleSchemeColumns(columns)}
                      visible={visible}
                      layoutType={layoutType}
                      params={params}
                      title={title}
                      onVisibleChange={onVisibleChange}
                      request={request}
                      onFinish={onFinish}
                      trigger={trigger} />
    </ProProvider.Provider>
  );
};

export default ArchiveSchema;
