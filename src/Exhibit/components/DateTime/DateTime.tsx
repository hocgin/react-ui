import React from 'react';
import styles from './DateTime.less';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Format } from '@hocgin/ui';
import type Picker from './Picker';

interface DateTimeProps {
  /**
   * 时间日期
   */
  value: string | number;
}

export default class DateTime extends React.Component<DateTimeProps> {
  static Picker: typeof Picker;
  static defaultProps = {
    value: 'N/A',
  };

  render() {
    return (
      <div className={styles.datetime}>
        <ClockCircleOutlined />
        <span className={styles.text}>{this.value}</span>
      </div>
    );
  }

  get value() {
    let { value } = this.props;
    let text = value;
    let valueType = typeof value;
    if (valueType === 'string') {
      text = value;
    } else if (valueType === 'number') {
      text = Format.DateTime.timestampAs(value as number);
    }
    return text;
  }
}
