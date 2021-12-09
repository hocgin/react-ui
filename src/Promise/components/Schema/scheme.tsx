import React from 'react';
import { Promise, Exhibit } from '@hocgin/ui';
import { FileInfo } from '@/Utils/interface';
import Dom from '@/Utils/dom';
import { ProRenderFieldPropsType } from '@ant-design/pro-provider';
import { UseAction } from '@/Promise/components/RadioButton/type';
import { Select } from 'antd';

export const handleSchemeColumns = (columns: any[]): any[] => {
  return columns.map(handleSchemeColumn);
};

const handleSchemeColumn = (column: any): any => {
  // log: 这边是用来兼容 antd pro 组件 valueTypeMaps 不生效的问题
  let valueType = `${column?.valueType}`;
  let isCustom = valueType.startsWith(Dom.COLUMN_PREFIX);
  if (!isCustom) {
    return column;
  }
  let schemeColumn = SchemeColumns[valueType];
  column.renderFormItem = (item: any, config: any, form: any) => {
    let text = config?.value;
    return schemeColumn?.renderFormItem?.(text, item, form);
  };
  column.render = (dom: any, entity: any, index: number, action: any, schema: any) => {
    return schemeColumn?.render?.(schema?.text, { mode: schema?.mode, ...column }, dom);
  };
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
      return <div>{text}</div>;
    },
    renderFormItem: (text: any, props: any) => {
      let params: SelectParam = props?.params || {};
      return (
        <Promise.Select {...props?.fieldProps} multiple={params?.multiple} useAction={params?.useAction} />
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
        <Promise.Checkbox useAction={params?.useAction} {...props?.fieldProps} />
      );
    },
  },

  [prefix('radio')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      let params: RadioParam = props?.params || {};
      return (
        <Promise.Radio useAction={params?.useAction} {...props?.fieldProps} />
      );
    },
  },

  [prefix('radioButton')]: {
    render: (text: any) => <div>{text}</div>,
    renderFormItem: (text: any, props: any) => {
      let params: RadioButtonParam = props?.params || {};
      return (
        <Promise.RadioButton useAction={params?.useAction}  {...props?.fieldProps} />
      );
    },
  },
  // https://procomponents.ant.design/components/field
};
