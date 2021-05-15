import React, { Component } from 'react';
import styles from './index.less';

interface PreviewProps {}

interface PreviewState {}

class Index extends Component<PreviewProps, PreviewState> {
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
