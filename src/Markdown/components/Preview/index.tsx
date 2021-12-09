import React, { Component } from 'react';
import styles from './index.less';

interface EditorProps {
  children?: string;
}

interface EditorState {
}

class Index extends Component<EditorProps, EditorState> {
  static defaultProps = {
    children: '',
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    let { children } = this.props;
    let result = <span>需要安装 @uiw/react-md-editor</span>;
    try {
      let MDEditor = require('@uiw/react-md-editor');
      result = <MDEditor.Markdown source={children} />;
    } catch (e) {
      console.warn('需要安装 @uiw/react-md-editor', e);
    }

    return (
      <div className={styles.markdownPreview}>
        {result}
      </div>
    );
  }
}

export default Index;
