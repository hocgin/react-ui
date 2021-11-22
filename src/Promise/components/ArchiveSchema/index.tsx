import React, { useContext } from 'react';
import ProProvider from '@ant-design/pro-provider';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import {
  SchemeColumns,
  handleSchemeColumns,
} from '@/Promise/components/scheme';

// @formatter: off
const ArchiveSchema: React.FC<FormSchema> = ({ columns, ...rest }) => {
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
      <BetaSchemaForm columns={handleSchemeColumns(columns)} {...rest} />
    </ProProvider.Provider>
  );
};

export default ArchiveSchema;
