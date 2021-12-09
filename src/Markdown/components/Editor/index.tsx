import React, { Component } from 'react';
import styles from './index.less';

interface EditorProps {
  value: string;
  height?: number;
  onChange?: (value?: string) => void;
}

class Index extends Component<EditorProps, {}> {
  static defaultProps = {};

  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    let { children, value, height, onChange } = this.props;

    let result = <span>需要安装 @uiw/react-md-editor</span>;
    try {
      let MDEditor = require('@uiw/react-md-editor');
      result = <MDEditor value={value} height={height} onChange={onChange} />;
    } catch (e) {
      console.warn('需要安装 @uiw/react-md-editor', e);
    }

    return <>{result}</>;
  }
}

export default Index;
