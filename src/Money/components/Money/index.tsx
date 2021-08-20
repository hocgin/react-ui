import React from 'react';
import classnames from 'classnames';
import { Statistic } from 'antd';
import styles from './index.less';

let { Countdown } = Statistic;

interface MoneyProps {
  precision?: number;
  value?: number | string;
}

interface MoneyState {
}

class Index extends React.Component<MoneyProps, MoneyState> {
  private static defaultProps = {
    precision: 2,
    value: '-.--',
  };
  state = {};

  render() {
    let {} = this.state;
    let { precision, value } = this.props;
    return (<div className={styles.component}>
      <Statistic valueStyle={{ color: '#E86A5E' }} prefix={'¥'} value={value} precision={precision} />
    </div>);
  }

}

export default Index;
