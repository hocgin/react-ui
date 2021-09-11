import React, { useContext } from 'react';
import ProProvider from '@ant-design/pro-provider';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { Promise } from '@hocgin/ui';
import { FormSchema } from '@ant-design/pro-form/lib/components/SchemaForm';
import { SchemeColumns } from '@/Promise/components/scheme';
import {
  GinTreeSelectParam,
  GinSelectParam,
  GinUploadParam, GinCheckboxParam, GinRadioParam, GinRadioButtonParam,
} from './interfaces';

const prefix = (type: string) => {
  return `gin.${type}`;
};

// @formatter: off
const ArchiveSchema: React.FC<FormSchema> = ({ columns, ...rest }) => {
  // @formatter: on
  const values = useContext(ProProvider);
  return (
    <ProProvider.Provider
      value={{
        ...values,
        valueTypeMap: {
          [prefix('upload')]: {
            render: (text) => <div>{text}</div>,
            renderFormItem: (text, props) => {
              // @ts-ignore
              let params: GinUploadParam = props?.params || {};
              return (
                <Promise.FileUpload
                  action={params?.action}
                  maxCount={params?.maxCount}
                  {...props?.fieldProps}
                />
              );
            },
          },
          [prefix('select')]: {
            render: (text) => <div>{text}</div>,
            renderFormItem: (text, props) => {
              // @ts-ignore
              let params: GinSelectParam = props?.params || {};
              return (
                <Promise.Select
                  multiple={params?.multiple || false}
                  action={params.action}
                  {...props?.fieldProps}
                />
              );
            },
          },
          [prefix('treeSelect')]: {
            render: (text) => <div>{text}</div>,
            renderFormItem: (text, props) => {
              // @ts-ignore
              let params: GinTreeSelectParam = props?.params || {};
              return (
                <Promise.TreeSelect
                  multiple={params?.multiple || false}
                  action={params.action}
                  {...props?.fieldProps}
                />
              );
            },
          },
          [prefix('checkbox')]: {
            render: (text) => <div>{text}</div>,
            renderFormItem: (text, props) => {
              // @ts-ignore
              let params: GinCheckboxParam = props?.params || {};
              return (
                <Promise.Checkbox action={params.action}
                                  {...props?.fieldProps} />
              );
            },
          },
          [prefix('radio')]: {
            render: (text) => <div>{text}</div>,
            renderFormItem: (text, props) => {
              // @ts-ignore
              let params: GinRadioParam = props?.params || {};
              return (
                <Promise.Radio action={params.action} {...props?.fieldProps} />
              );
            },
          },
          [prefix('radioButton')]: {
            render: (text) => <div>{text}</div>,
            renderFormItem: (text, props) => {
              // @ts-ignore
              let params: GinRadioButtonParam = props?.params || {};
              return (
                <Promise.RadioButton action={params.action} {...props?.fieldProps} />
              );
            },
          },
        },
      }}>
      <BetaSchemaForm columns={SchemeColumns(columns)} {...rest} />
    </ProProvider.Provider>
  );
};

export default ArchiveSchema;
