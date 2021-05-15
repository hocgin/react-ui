import React, { Component } from 'react';
import styles from './index.less';

interface EditorProps {}

interface EditorState {}

class Index extends Component<EditorProps, EditorState> {
  private static defaultProps = {};

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {}

  render() {
    let { children } = this.props;
    return <>{children}</>;
  }
}

export default Index;
