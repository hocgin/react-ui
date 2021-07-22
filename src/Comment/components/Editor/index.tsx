import React, { Component } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { Avatar, Mentions } from 'antd';

interface EditorProps {}

interface EditorState {}

class Index extends Component<EditorProps, EditorState> {
  private static defaultProps = {};

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {}

  render() {
    let {} = this.props;
    return <div className={classNames(styles.editor)}></div>;
  }
}

export default Index;
