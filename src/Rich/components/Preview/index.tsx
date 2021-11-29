import React, { Component } from 'react';
import 'braft-extensions/dist/code-highlighter.css';
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
      <div className={styles.richPreview}>
        <div dangerouslySetInnerHTML={this.dangerouslySetInnerHTML} />
      </div>
    );
  }

  get dangerouslySetInnerHTML() {
    let { children } = this.props;
    return { __html: `${children}` };
  }
}

export default Index;
