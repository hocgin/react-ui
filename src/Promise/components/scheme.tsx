import React from 'react';
import { Promise, Exhibit } from '@hocgin/ui';
import { FileInfo, IPage, Result } from '@/Utils/interface';
import { ProRenderFieldPropsType } from '@ant-design/pro-provider';
import { TableSchemaDataResult } from '@/Promise/components/TableSchema';

/**
 * @deprecated
 * @param result
 */
export const asTableDataResult = (
  result: Result<IPage>,
): TableSchemaDataResult => {
  return {
    success: result?.success,
    data: result?.data?.records ?? [],
    total: result?.data?.total || 0,
  };
};

export const handleSchemeColumns = (columns: any[]): any[] => {
  return columns.map(handleSchemeColumn);
};

const handleSchemeColumn = (column: any): any => {
  return column;
};

export const prefix = (type: string) => {
  return `ui.${type}`;
};

export interface GinUploadParam {
  action: string;
  maxCount?: number;
}

export interface GinSelectParam {
  useAction: string;
  multiple?: boolean;
}

export interface GinTreeSelectParam {
  useAction: string;
  multiple?: boolean;
}

export interface GinCheckboxParam {
  useAction: string;
}

export interface GinRadioParam {
  useAction: string;
}

export interface GinRadioButtonParam {
  useAction: string;
}

export const SchemeColumns: Record<string, ProRenderFieldPropsType> = {
  [prefix('upload')]: {
    render: (record: FileInfo | FileInfo[]) => {
      if (record instanceof Array) {
        return <Exhibit.Array.Image src={record.map(({ url }) => url)} />;
      }
      return <Exhibit.Image src={record.url} />;
    },
    renderFormItem: (text: any, props: any) => {
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
    render: (text: any, props: any) => {
      console.log(text, props);
      return <div>{text}</div>;
    },
    renderFormItem: (text: any, props: any) => {
      // @ts-ignore
      let params: GinSelectParam = props?.params || {};
      return (
        <Promise.Select
          multiple={params?.multiple ?? false}
          useAction={params.useAction}
          {...props?.fieldProps}
        />
      );
    },
  },
  [prefix('treeSelect')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      // @ts-ignore
      let params: GinTreeSelectParam = props?.params || {};
      return (
        <Promise.TreeSelect
          multiple={params?.multiple || false}
          useAction={params.useAction}
          {...props?.fieldProps}
        />
      );
    },
  },
  [prefix('checkbox')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      // @ts-ignore
      let params: GinCheckboxParam = props?.params || {};
      return (
        <Promise.Checkbox useAction={params.useAction} {...props?.fieldProps} />
      );
    },
  },
  [prefix('radio')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      // @ts-ignore
      let params: GinRadioParam = props?.params || {};
      return (
        <Promise.Radio useAction={params.useAction} {...props?.fieldProps} />
      );
    },
  },
  [prefix('radioButton')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      // @ts-ignore
      let params: GinRadioButtonParam = props?.params || {};
      return (
        <Promise.RadioButton
          useAction={params.useAction}
          {...props?.fieldProps}
        />
      );
    },
  },
};
