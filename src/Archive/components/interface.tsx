import { Rule } from 'rc-field-form/lib/interface';

export interface Option {
  key: string;
  value: string;
}

export interface ArchiveAttach {}

export interface InputTextarea extends ArchiveAttach {
  allowClear?: boolean;
  autoSize?: boolean | object;
}

export interface RadioAttach extends ArchiveAttach {
  options?: Option[];
}

export interface SelectAttach extends ArchiveAttach {
  options?: Option[];
}

export interface DatetimeAttach extends ArchiveAttach {
  showTime?: boolean;
}

export interface ArchiveColumn {
  /**
   * 标题
   */
  title: string;
  /**
   * 提交参数
   */
  key: string;
  /**
   * 校验规则(Form)
   */
  rules?: Rule[];
  /**
   * 组件类型
   */
  type?:
    | 'input'
    | 'input.textarea'
    | 'input.number'
    | 'input.password'
    | 'input.phone'
    | 'input.email'
    | 'input.url'
    | 'radio.button'
    | 'switch'
    | 'select'
    | 'select.multiple'
    | 'datetime'
    | 'datetime.range'
    | 'tree'
    | 'tree.multiple'
    | 'rate'
    | 'slider'
    | 'file.upload';
  /**
   * 组件配置参数
   */
  attach?: DatetimeAttach | SelectAttach | InputTextarea | RadioAttach | any;
  /**
   * 提示信息
   */
  tooltip?: string;
  /**
   * 提示信息
   */
  placeholder?: string;
  /**
   * 是否必须
   */
  required?: boolean;
  /**
   * 自定义渲染
   */
  render?: (column: ArchiveColumn) => React.ReactElement;
  /**
   * 自定义参数转换
   */
  convert?: (key: string, value: any) => { [key: string]: any };
}
