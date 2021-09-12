import React from 'react';
import { Promise, Exhibit } from '@hocgin/ui';
import { FileInfo, IPage, Result } from '@/Utils/interface';
import { ProRenderFieldPropsType } from '@ant-design/pro-provider';
import { TableSchemaDataResult } from '@/Promise/components/TableSchema';

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

const prefix = (type: string) => {
  return `gin.${type}`;
};

export interface GinUploadParam {
  action: string;
  maxCount?: number;
}

export interface GinSelectParam {
  action: string;
  multiple?: boolean;
}

export interface GinTreeSelectParam {
  action: string;
  multiple?: boolean;
}

export interface GinCheckboxParam {
  action: string;
}

export interface GinRadioParam {
  action: string;
}

export interface GinRadioButtonParam {
  action: string;
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
          multiple={params?.multiple || false}
          action={params.action}
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
          action={params.action}
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
      return <Promise.Checkbox action={params.action} {...props?.fieldProps} />;
    },
  },
  [prefix('radio')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      // @ts-ignore
      let params: GinRadioParam = props?.params || {};
      return <Promise.Radio action={params.action} {...props?.fieldProps} />;
    },
  },
  [prefix('radioButton')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      // @ts-ignore
      let params: GinRadioButtonParam = props?.params || {};
      return (
        <Promise.RadioButton action={params.action} {...props?.fieldProps} />
      );
    },
  },
};
