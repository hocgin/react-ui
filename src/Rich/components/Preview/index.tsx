import React, { Component } from 'react';
import styles from './index.less';
import { Utils } from '@/index';

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
    Utils.Lang.tryRequire('braft-extensions/dist/code-highlighter.css');
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
