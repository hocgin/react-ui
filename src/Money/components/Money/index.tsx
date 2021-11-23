import React from 'react';
import classnames from 'classnames';
import { Statistic } from 'antd';
import styles from './index.less';

interface MoneyProps {
  precision?: number;
  value?: number | string;
}

interface MoneyState {}

class Index extends React.Component<MoneyProps, MoneyState> {
  static defaultProps = {
    precision: 2,
    value: '-.--',
  };
  state = {};

  render() {
    let {} = this.state;
    let { precision, value } = this.props;
    return (
      <div className={styles.component}>
        <Statistic
          valueStyle={this.valueStyle}
          prefix={'¥'}
          value={value}
          precision={precision}
        />
      </div>
    );
  }

  get valueStyle() {
    return { color: '#E86A5E' };
  }
}

export default Index;
