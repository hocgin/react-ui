import React from 'react';
import { Badge } from 'antd';

export interface ColorMap {
  [key: string]: string;
}

/**
 * Status 属性
 */
export interface StatusProps {
  /**
   * 颜色枚举
   */
  colorMaps?: ColorMap;
  /**
   * 枚举值
   */
  value?: string | boolean | number;
  /**
   * 枚举标题
   */
  title?: string;
}

/**
 * @description 状态类型
 */
class Status extends React.Component<StatusProps> {
  static defaultProps = {
    colorMaps: {},
    value: '',
    title: 'N/A',
  };

  render() {
    let { title, value } = this.props;
    let color = this.colorMaps[`${value}`];
    return (
      <div>
        <Badge color={color} text={title} />
      </div>
    );
  }

  get colorMaps() {
    return {
      '': '#000',
      null: '#000',
      ...this.props.colorMaps,
    } as ColorMap;
  }
}

export default Status;
