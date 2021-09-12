import React, { useContext } from 'react';
import ProProvider from '@ant-design/pro-provider';
import ProTable from '@ant-design/pro-table';
import {
  SchemeColumns,
  handleSchemeColumns,
} from '@/Promise/components/scheme';
import { ProTableProps } from '@ant-design/pro-table/lib/typing';

export interface TableSchemaDataResult<T = any> {
  data: T[];
  success: boolean;
  total: number;
}

interface TableSchemaProps extends ProTableProps<any, any, any> {}

// @formatter: off
const ArchiveSchema: React.FC<TableSchemaProps> = ({
  columns,
  rowKey,
  children,
  ...rest
}) => {
  // @formatter: on
  const values = useContext(ProProvider);
  return (
    <ProProvider.Provider
      value={{
        ...values,
        valueTypeMap: {
          ...SchemeColumns,
        },
      }}
    >
      <ProTable
        rowKey={rowKey || 'id'}
        search={{ labelWidth: 'auto' }}
        columns={handleSchemeColumns(columns || [])}
        {...rest}
      >
        {children}
      </ProTable>
    </ProProvider.Provider>
  );
};

export default ArchiveSchema;
