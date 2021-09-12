import React, { useContext } from 'react';
import ProProvider from '@ant-design/pro-provider';
import ProDescriptions from '@ant-design/pro-descriptions';
import { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import { SchemeColumns, handleSchemeColumns } from '@/Promise/components/scheme';

// @formatter: off
const ArchiveSchema: React.FC<FormSchema> = ({ columns, ...rest }) => {
// @formatter: on
  const values = useContext(ProProvider);
  return (
    <ProProvider.Provider value={{
        ...values,
        valueTypeMap: {
          ...SchemeColumns,
        },
      }}>
      <ProDescriptions columns={handleSchemeColumns(columns)} {...rest} />
    </ProProvider.Provider>
  );
};

export default ArchiveSchema;
