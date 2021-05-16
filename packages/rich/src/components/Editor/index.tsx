import React, { Component } from 'react';
import 'braft-editor/dist/index.css';
import RichEditor from 'braft-editor';
import styles from './index.less';

interface EditorProps {
  value?: string;
  onChange?: (value?: string) => void;
}

interface EditorState {

}

class Index extends Component<EditorProps, EditorState> {
  private static defaultProps = {
    children: '',
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
  }

  render() {
    let { value, onChange } = this.props;
    return <div className={styles.rich}>
      <RichEditor value={RichEditor.createEditorState(`${value}`)} onChange={onChange} />
    </div>;
  }

}

export default Index;
