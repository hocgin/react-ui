import React from 'react';
import { Promise, Exhibit, Rich, Markdown } from '@hocgin/ui';
import Dom from '@/Utils/dom';
import styles from './index.less';
import { ProRenderFieldPropsType } from '@ant-design/pro-provider';
import { Input } from 'antd';

export const handleSchemeColumns = (columns: any[]): any[] => {
  return columns.map(handleSchemeColumn);
};

const handleSchemeColumn = (column: any): any => {
  // fixme 20211209: 这边是用来兼容 antd pro 组件 valueTypeMaps 不生效的问题
  let valueType = `${column?.valueType}`;
  let isCustom = valueType.startsWith(Dom.COLUMN_PREFIX);
  if (!isCustom) {
    let columnsField = column?.columns;

    // 处理内嵌的 columns 函数
    if (columnsField instanceof Function) {
      column.columns = (...rest: any) =>
        columnsField(...rest).map(handleSchemeColumn);
    }
    // 处理内嵌的 columns 字段
    else if (columnsField instanceof Array) {
      column.columns = columnsField.map(handleSchemeColumn);
    }
    return column;
  }
  let schemeColumn = SchemeColumns[valueType];
  column.renderFormItem = (item: any, config: any, form: any) => {
    let text = config?.value;
    return schemeColumn?.renderFormItem?.(text, item, form);
  };
  column.render = (
    dom: any,
    entity: any,
    index: number,
    action: any,
    schema: any,
  ) => {
    return schemeColumn?.render?.(
      schema?.text,
      { mode: schema?.mode, ...column },
      dom,
    );
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
  useAction: any;
}

export const SchemeColumns: Record<string, ProRenderFieldPropsType> = {
  // 上传按钮
  [prefix('upload')]: {
    render: (record?: any) => {
      if (!record) {
        return <span>-</span>;
      }

      if (record && record instanceof Array) {
        return <Exhibit.Array.Image src={record.map(({ url }) => url)} />;
      }
      return <Exhibit.Image src={record?.url} />;
    },
    renderFormItem: (text: any, props: any) => {
      let params: UploadParam = props?.params || {};
      return (
        <Promise.FileUpload
          action={params?.action}
          maxCount={params?.maxCount}
          {...props?.fieldProps}
        />
      );
    },
  },
  // 下拉选择框
  [prefix('select')]: {
    render: (text: any, props: any) => {
      if (!text) {
        return <span>-</span>;
      }
      return <div>{text}</div>;
    },
    renderFormItem: (text: any, props: any) => {
      let params: any = props?.params || {};
      return (
        <Promise.Select
          {...props?.fieldProps}
          multiple={params?.multiple}
          useAction={params?.useAction}
        />
      );
    },
  },
  // 搜索框
  [prefix('search')]: {
    render: (text: any, props: any) => {
      let params: any = props?.params || {};
      text = params?.defaultValue;
      if (!text) {
        return <div>-</div>;
      }
      return <div>{text}</div>;
    },
    renderFormItem: (text: any, props: any) => {
      let params: any = props?.params || {};
      let valueEnum = props?.valueEnum || {};

      let options: any = [];
      if (text) {
        options = Object.keys(valueEnum).map((value) => {
          let newValue: any = value;

          // 如果是 number 类型
          if (
            typeof text === 'number' ||
            (typeof text === 'object' &&
              text instanceof Array &&
              text?.length > 0 &&
              typeof text[0] === 'number')
          ) {
            newValue = parseInt(value);
          }

          // 如果是 string 类型
          if (
            typeof text === 'string' ||
            (typeof text === 'object' &&
              text instanceof Array &&
              text?.length > 0 &&
              typeof text[0] === 'string')
          ) {
            newValue = `${value}`;
          }

          return {
            value: newValue,
            // title
            key: valueEnum[value]?.text ?? valueEnum[value],
          };
        });
      }
      return (
        <Promise.Search
          options={options}
          defaultValue={params?.defaultValue}
          multiple={params?.multiple}
          useAction={params?.useAction}
          {...props?.fieldProps}
        />
      );
    },
  },
  // 树型选择框
  [prefix('treeSelect')]: {
    render: (text: any) => {
      if (!text) {
        return <span>-</span>;
      }
      return <div>{text}</div>;
    },
    renderFormItem: (text: any, props: any) => {
      let params: TreeSelectParam = props?.params || {};
      return (
        <Promise.TreeSelect
          multiple={params?.multiple ?? false}
          useAction={params.useAction}
          {...props?.fieldProps}
        />
      );
    },
  },
  // 多选按钮
  [prefix('checkbox')]: {
    render: (text: any) => {
      if (!text) {
        return <span>-</span>;
      }
      return <div>{text}</div>;
    },
    renderFormItem: (text: any, props: any) => {
      let params: CheckboxParam = props?.params || {};
      return (
        <Promise.Checkbox
          useAction={params?.useAction}
          {...props?.fieldProps}
        />
      );
    },
  },
  // 单选
  [prefix('radio')]: {
    render: (text: any) => {
      if (!text) {
        return <span>-</span>;
      }
      return <div>{text}</div>;
    },
    renderFormItem: (text: any, props: any) => {
      let params: RadioParam = props?.params || {};
      return (
        <Promise.Radio useAction={params?.useAction} {...props?.fieldProps} />
      );
    },
  },
  // 单选按钮
  [prefix('radioButton')]: {
    render: (text: any) => {
      if (!text) {
        return <span>-</span>;
      }
      return <div>{text}</div>;
    },
    renderFormItem: (text: any, props: any) => {
      let params: RadioButtonParam = props?.params || {};
      return (
        <Promise.RadioButton
          useAction={params?.useAction}
          {...props?.fieldProps}
        />
      );
    },
  },
  // 多行文本
  [prefix('stretch')]: {
    render: (text: any, props: any) => {
      if (!text) {
        return <span>-</span>;
      }
      let { maxRow, fullSize } = props?.params || {};

      return (
        <Exhibit.Text.Stretch maxRow={maxRow ?? 2} fullSize={fullSize ?? false}>
          {text}
        </Exhibit.Text.Stretch>
      );
    },
    renderFormItem: (text: any, props: any) => {
      return <Input.TextArea {...props?.fieldProps} />;
    },
  },
  // 代码
  [prefix('code')]: {
    render: (text: any) => {
      if (!text) {
        return <span>-</span>;
      }
      return <Exhibit.Text.Stretch>{text}</Exhibit.Text.Stretch>;
    },
    renderFormItem: (text: any, props: any) => {
      return <Input.TextArea {...props?.fieldProps} />;
    },
  },
  // 链接
  [prefix('link')]: {
    render: (text: any, props: any) => {
      if (!text) {
        return <span>-</span>;
      }

      let { type } = props?.params || {};
      if (type === 'download') {
        return <Exhibit.Link.Download url={text} />;
      } else if (type === 'file') {
        return <Exhibit.Link.Download url={text} title={'文件'} />;
      } else {
        return <Exhibit.Link.Site url={text} />;
      }
    },
    renderFormItem: (text: any, props: any) => {
      return <Input {...props?.fieldProps} />;
    },
  },
  // 编号
  [prefix('encoding')]: {
    render: (text: any, props: any) => {
      if (!text) {
        return <span>-</span>;
      }
      return <div>{text}</div>;
    },
    renderFormItem: (text: any, props: any) => {
      let { prefix, randExp } = props?.params || {};
      return <Promise.Encoding
        prefix={prefix}
        randEx={randExp}
        {...props?.fieldProps}
      />;
    },
  },
  // 富文本编辑器
  [prefix('rich')]: {
    render: (text: any, props: any) => {
      if (!text) {
        return <div className={styles.box}><Rich.Preview>-</Rich.Preview></div>;
      }
      return <div className={styles.box}><Rich.Preview>{text}</Rich.Preview></div>;
    },
    renderFormItem: (text: any, props: any) => {
      return <Rich.Editor {...props?.fieldProps} />;
    },
  },
  // MD编辑器
  [prefix('markdown')]: {
    render: (text: any, props: any) => {
      if (!text) {
        return <div className={styles.box}><Markdown.Preview>-</Markdown.Preview></div>;
      }
      return <div className={styles.box}><Markdown.Preview>{text}</Markdown.Preview></div>;
    },
    renderFormItem: (text: any, props: any) => {
      return <Markdown.Editor {...props?.fieldProps} />;
    },
  },
  // https://procomponents.ant.design/components/field
};
