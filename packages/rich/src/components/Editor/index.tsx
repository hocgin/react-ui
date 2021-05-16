import React, { Component } from 'react';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import 'braft-extensions/dist/table.css';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import Table from 'braft-extensions/dist/table';
import Markdown from 'braft-extensions/dist/markdown';
import RichEditor from 'braft-editor';
import styles from './index.less';

const ID = 'rich-editor';

RichEditor.use(CodeHighlighter({}));
RichEditor.use(Table({}));
RichEditor.use(Markdown({}));

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
      <RichEditor id={ID}
                  value={RichEditor.createEditorState(`${value}`)}
                  onChange={onChange} />
    </div>;
  }

}

export default Index;
