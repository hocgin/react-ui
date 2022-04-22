import React from 'react';
import { Code as HCode } from '@/index';

export interface CodeProps {
  /**
   * 内容
   */
  children?: string | Node;
}

class Code extends React.Component<CodeProps, {}> {
  render(): JSX.Element {
    return <HCode>{this.props?.children}</HCode>;
  }
}

export default Code;
