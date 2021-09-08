import React from 'react';
import styles from './index.less';
import { Badge } from 'antd';

interface ColorMap {
  [key: string]: string;
}

export interface SwitchProps {
  value?: string | boolean | number;
  title?: string;
}

const Switch: React.FC<SwitchProps> = ({ value, title }: SwitchProps) => {
  let on = ['on', '1', 'true'];
  let off = ['off', '0', 'false'];
  let colorMaps: ColorMap = {};
  on.forEach(v => colorMaps[v] = '#87d068');
  off.forEach(v => colorMaps[v] = '#f50');
  return (<Status colorMaps={colorMaps} value={value} title={title || (on.includes(`${value}`) ? '开启' : '关闭')} />);
};


/**
 * Status 属性
 */
export interface StatusProps {
  /**
   * 颜色枚举
   */
  colorMaps: ColorMap;
  /**
   * 枚举值
   */
  value: string | boolean | number;
  /**
   * 枚举标题
   */
  title: string;
}

interface StatusState {
}

/**
 * @description 状态类型
 */
class Status extends React.Component<StatusProps, StatusState> {
  static Switch = Switch;
  static defaultProps = {
    colorMaps: {},
    value: '',
    title: 'N/A',
  };

  render() {
    let { title, value } = this.props;
    let color = this.colorMaps[`${value}`];
    return (<div>
      <Badge color={color} text={title} />
    </div>);
  }

  get colorMaps() {
    return {
      '': '#000',
      'null': '#000',
      ...this.props.colorMaps,
    } as ColorMap;
  }
}

export default Status;
