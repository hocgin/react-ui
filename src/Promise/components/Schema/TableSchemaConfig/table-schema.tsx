import React, { useContext, useRef } from 'react';
import ProProvider from '@ant-design/pro-provider';
import ProTable from '@ant-design/pro-table';
import { SchemeColumns, handleSchemeColumns } from '../scheme';
import { ProTableProps } from '@ant-design/pro-table/lib/typing';
import { ActionType } from '@ant-design/pro-components';

interface TableSchemaProps extends ProTableProps<any, any, any> {
  [key: string]: any;
}

// @formatter: off
const ArchiveSchema: React.FC<TableSchemaProps> = ({
  columns = [],
  rowKey,
  children,
  ...rest
}) => {
  const actionRef = useRef<ActionType>();
  // @formatter: on
  const values = useContext(ProProvider);
  let value = {
    ...values,
    valueTypeMap: {
      ...SchemeColumns,
    },
  };
  let search = {};

  return (
    <ProProvider.Provider value={value}>
      <ProTable
        actionRef={actionRef}
        rowKey={rowKey || 'id'}
        search={search}
        tableStyle={{ overflowX: 'auto' }}
        columns={handleSchemeColumns(columns)}
        {...rest}
        tableAlertOptionRender={(...args) =>
          // @ts-ignore
          rest?.tableAlertOptionRender?.(...args, actionRef)
        }
      >
        {children}
      </ProTable>
    </ProProvider.Provider>
  );
};

export default ArchiveSchema;
