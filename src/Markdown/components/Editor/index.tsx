import React, { Component } from 'react';
import MDEditor from '@uiw/react-md-editor';
import styles from './index.less';

interface EditorProps {
  value: string;
  height?: number;
  onChange?: (value?: string) => void;
}

interface EditorState {}

class Index extends Component<EditorProps, EditorState> {
  static defaultProps = {};

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {}

  render() {
    let { children, value, height, onChange } = this.props;
    return (
      <>
        <MDEditor value={value} height={height} onChange={onChange} />
      </>
    );
  }
}

export default Index;
