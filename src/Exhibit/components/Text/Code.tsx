import React from 'react';
import { default as HCode } from '@/Code';

export interface CodeProps {
  /**
   * 内容
   */
  children?: any;
}

class Code extends React.Component<CodeProps, {}> {
  render(): JSX.Element {
    return <HCode>{this.props?.children}</HCode>;
  }
}

export default Code;
