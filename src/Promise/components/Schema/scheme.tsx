import React from 'react';
import { Promise, Exhibit } from '@hocgin/ui';
import { FileInfo } from '@/Utils/interface';
import Dom from '@/Utils/dom';
import { ProRenderFieldPropsType } from '@ant-design/pro-provider';
import { UseAction } from '@/Promise/components/RadioButton/type';

export const handleSchemeColumns = (columns: any[]): any[] => {
  return columns.map(handleSchemeColumn);
};

const handleSchemeColumn = (column: any): any => {
  return column;
};

function prefix(type: string): string {
  return Dom.columnPrefix(type);
}

export interface UploadParam {
  action: string;
  maxCount?: number;
}

export interface SelectParam {
  useAction: any;
  multiple?: boolean;
}

export interface TreeSelectParam {
  useAction: any;
  multiple?: boolean;
}

export interface CheckboxParam {
  useAction: any;
}

export interface RadioParam {
  useAction: any;
}

export interface RadioButtonParam {
  useAction: UseAction;
}

export const SchemeColumns: Record<string, ProRenderFieldPropsType> = {
  [prefix('upload')]: {
    render: (record: FileInfo | FileInfo[]) => {
      if (record && record instanceof Array) {
        return <Exhibit.Array.Image src={record.map(({ url }) => url)} />;
      }
      return <Exhibit.Image src={record?.url} />;
    },
    renderFormItem: (text: any, props: any) => {
      let params: UploadParam = props?.params || {};
      return (
        <Promise.FileUpload action={params?.action} maxCount={params?.maxCount} {...props?.fieldProps} />
      );
    },
  },
  [prefix('select')]: {
    render: (text: any, props: any) => {
      console.log('select render', text, props);
      return <div>{text}</div>;
    },
    renderFormItem: (text: any, props: any) => {
      console.log('select renderFormItem', text, props);
      let params: SelectParam = props?.params || {};
      return (
        <Promise.Select multiple={params?.multiple ?? false} useAction={params.useAction} {...props?.fieldProps} />
      );
    },
  },
  [prefix('treeSelect')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      let params: TreeSelectParam = props?.params || {};
      return (
        <Promise.TreeSelect multiple={params?.multiple ?? false} useAction={params.useAction} {...props?.fieldProps} />
      );
    },
  },
  [prefix('checkbox')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      let params: CheckboxParam = props?.params || {};
      return (
        <Promise.Checkbox useAction={params.useAction} {...props?.fieldProps} />
      );
    },
  },

  [prefix('radio')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      let params: RadioParam = props?.params || {};
      return (
        <Promise.Radio useAction={params.useAction} {...props?.fieldProps} />
      );
    },
  },

  [prefix('radioButton')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      let params: RadioButtonParam = props?.params || {};
      return (
        <Promise.RadioButton useAction={params.useAction}  {...props?.fieldProps} />
      );
    },
  },
  // https://procomponents.ant.design/components/field
};
