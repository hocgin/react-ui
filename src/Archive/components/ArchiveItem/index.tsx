import React from 'react';
import { InputNumber, DatePicker, Input, Radio, Switch, Select } from 'antd';
import {
  ArchiveColumn,
  DatetimeAttach,
  Option,
} from '@/Archive/components/interface';

export interface ArchiveProps {
  /**
   * 定义
   */
  column: ArchiveColumn;
}

class Index extends React.Component<ArchiveProps> {
  static defaultProps = {};

  render(): JSX.Element {
    let { column } = this.props;
    return <>{this.renderColumn(column)}</>;
  }

  renderColumn(column: ArchiveColumn) {
    let columnType = column.type || 'input';
    let columnAttach = column.attach || {};

    // [Input]
    if (columnType === 'input') {
      return <Input placeholder={column?.placeholder} />;
    } else if (columnType === 'input.number') {
      return <InputNumber placeholder={column?.placeholder} />;
    } else if (columnType === 'input.textarea') {
      return (
        <Input.TextArea
          placeholder={column?.placeholder}
          autoSize={columnAttach?.autoSize}
          allowClear={columnAttach?.allowClear}
        />
      );
    } else if (columnType === 'input.password') {
      return <Input.Password placeholder={column?.placeholder} />;
    } else if (columnType === 'input.email') {
      return <Input type="email" placeholder={column?.placeholder} />;
    } else if (columnType === 'input.url') {
      return <Input type="url" placeholder={column?.placeholder} />;
    }
    // [Radio]
    else if (columnType === 'radio.button') {
      let options = columnAttach?.options || [];
      return (
        <Radio.Group size="middle" buttonStyle="solid">
          {options.map(({ key, value }: Option) => (
            <Radio.Button value={value}>{key}</Radio.Button>
          ))}
        </Radio.Group>
      );
    } else if (columnType === 'switch') {
      return <Switch checkedChildren="开启" unCheckedChildren="关闭" />;
    }
    // [Select]
    else if (columnType === 'select') {
      let options = columnAttach?.options || [];
      return (
        <Select placeholder={column?.placeholder}>
          {options.map(({ key, value }: Option) => (
            <Select.Option value={value}>{key}</Select.Option>
          ))}
        </Select>
      );
    } else if (columnType === 'select.multiple') {
      let options = columnAttach?.options || [];
      return (
        <Select mode="multiple" placeholder={column?.placeholder}>
          {options.map(({ key, value }: Option) => (
            <Select.Option value={value}>{key}</Select.Option>
          ))}
        </Select>
      );
    }
    // [Datetime]
    else if (columnType === 'datetime') {
      let attach = column.attach as DatetimeAttach;
      return (
        <DatePicker
          showTime={attach?.showTime}
          placeholder={column?.placeholder}
        />
      );
    } else if (columnType === 'datetime.range') {
      let attach = column.attach as DatetimeAttach;
      return <DatePicker.RangePicker showTime={attach?.showTime} />;
    } else {
      return column?.render && column?.render(column);
    }
  }
}

export default Index;
