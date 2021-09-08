import React from 'react';
import styles from './index.less';
import { ClockCircleOutlined, SwapOutlined } from '@ant-design/icons';
import { DateFormat } from '@/Utils/format';


interface DateTimeProps {
  /**
   * 时间日期
   */
  value: string | number;
}

const DateTime: React.FC<DateTimeProps> = ({ value = 'N/A' }: DateTimeProps) => {
  let text = value;
  if (typeof value === 'string') {
    text = value;
  } else if (typeof value === 'number') {
    text = DateFormat.timestampAs(value);
  }

  return (<div className={styles.datetime}>
    <ClockCircleOutlined /><span className={styles.text}>{text}</span>
  </div>);
};

export interface DateTimePickerProps {
  startAt: string | number;
  endAt: string | number;
}

interface DateTimePickerState {
}


class Index extends React.Component<DateTimePickerProps, DateTimePickerState> {
  static DateTime = DateTime;
  static defaultProps = {
    startAt: null,
    endAt: null,
  };

  render() {
    let { startAt, endAt } = this.props;
    return (<div>
      <DateTime value={startAt} />
      <SwapOutlined />
      <DateTime value={endAt} />
    </div>);
  }
}

export default Index;
