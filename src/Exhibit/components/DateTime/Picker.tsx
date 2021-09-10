import { SwapOutlined } from '@ant-design/icons';
import DateTime from './DateTime';
import React from 'react';

export interface DateTimePickerProps {
  startAt: string | number;
  endAt: string | number;
}

class Index extends React.Component<DateTimePickerProps> {
  static defaultProps = {
    startAt: null,
    endAt: null,
  };

  render() {
    let { startAt, endAt } = this.props;
    return (
      <div>
        <DateTime value={startAt} />
        <SwapOutlined />
        <DateTime value={endAt} />
      </div>
    );
  }
}

export default Index;
