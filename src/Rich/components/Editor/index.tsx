import React, { Component } from 'react';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import 'braft-extensions/dist/table.css';
import RichEditor from 'braft-editor';
import styles from './index.less';

const EDITOR_ID = 'rich-editor';

interface EditorProps {
  value?: string;
  onChange?: (value?: string) => void;
}

interface EditorState {}

class Index extends Component<EditorProps, EditorState> {
  static defaultProps = {
    children: '',
  };

  state = {
    richValue: null,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    let initValue = () =>
      this.setState({
        richValue: RichEditor.createEditorState(this.props?.value, {
          editorId: EDITOR_ID,
        }),
      });
    if (RichEditor && window) {
      // @ts-ignore
      import('braft-extensions/dist/code-highlighter.js')
        .then((CodeHighlighter) => RichEditor.use(CodeHighlighter.default()))
        .finally(() => {
          // @ts-ignore
          import('braft-extensions/dist/table.js')
            .then((Table) => RichEditor.use(Table.default()))
            .finally(() => {
              // @ts-ignore
              import('braft-extensions/dist/markdown.js')
                .then((Markdown) => RichEditor.use(Markdown.default()))
                .finally(initValue);
            });
        });
    } else {
      initValue();
    }
  }

  render() {
    let { value, onChange } = this.props;
    let { richValue } = this.state;
    return (
      <div className={styles.rich}>
        <RichEditor id={EDITOR_ID} value={richValue} onChange={onChange} />
      </div>
    );
  }
}

export default Index;
