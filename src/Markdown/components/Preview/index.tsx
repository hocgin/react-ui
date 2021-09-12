import React, { Component } from 'react';
import MDEditor from '@uiw/react-md-editor';
import styles from './index.less';

interface EditorProps {
  children?: string;
}

interface EditorState {}

class Index extends Component<EditorProps, EditorState> {
  static defaultProps = {
    children: '',
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {}

  render() {
    let { children } = this.props;
    return (
      <div className={styles.markdownPreview}>
        <MDEditor.Markdown source={children} />
      </div>
    );
  }
}

export default Index;
