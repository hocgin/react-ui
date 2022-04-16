import React from 'react';
import CountUp from 'react-countup';
import Lang from '@/Utils/lang';

export interface DecimalProps {
  /**
   * 金额
   */
  value?: number | string;
  /**
   * 小数位
   */
  decimals?: number;
  /**
   * 前缀
   */
  prefix?: string;
  /**
   * 后缀
   */
  suffix?: string;
}

interface DecimalState {}

class Index extends React.Component<DecimalProps, DecimalState> {
  static defaultProps = {
    decimals: 2,
    prefix: '¥',
  };

  render() {
    let { decimals, prefix } = this.props;
    return (
      <div>
        <CountUp
          start={0}
          end={this.value}
          duration={1}
          useEasing={true}
          separator=","
          prefix={prefix}
          decimals={decimals}
          decimal={'.'}
        />
      </div>
    );
  }

  get value() {
    let { value } = this.props;
    let toNumber = Lang.toNumber(value);
    console.log('to', toNumber);
    return toNumber;
  }
}

export default Index;
