import React, { useContext } from 'react';
import { ConfigProvider as AntdConfigProvider } from 'antd';
import ProTable from '@ant-design/pro-table';
import {
  SchemeColumns,
  handleSchemeColumns,
} from '../scheme';
import { ProTableProps } from '@ant-design/pro-table/lib/typing';

interface TableSchemaProps extends ProTableProps<any, any, any> {
}

// @formatter: off
const ArchiveSchema: React.FC<TableSchemaProps> = ({
                                                     columns,
                                                     rowKey,
                                                     children,
                                                     ...rest
                                                   }) => {
  // @formatter: on
  let ProProvider = AntdConfigProvider.ConfigContext;
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
      <ProTable rowKey={rowKey || 'id'}
                search={search}
                columns={handleSchemeColumns(columns || [])}
                {...rest}>
        {children}
      </ProTable>
    </ProProvider.Provider>
  );
};

export default ArchiveSchema;
