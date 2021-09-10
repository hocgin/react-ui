import React from 'react';
import type Stretch from './Stretch';
import type Code from './Code';
import Tag from 'antd/lib/tag';

/**
 * Text 属性
 */
export interface TextProps {
  /**
   * 文本内容
   */
  value?: string;
}

/**
 * Text 组件
 */
class Text extends React.Component<TextProps> {
  static Stretch: typeof Stretch;
  static Code: typeof Code;
  static Tag: typeof Tag;

  static defaultProps = {};

  render(): JSX.Element {
    let {} = this.props;
    return <div></div>;
  }
}

export default Text;
