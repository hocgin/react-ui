import React, { Component } from 'react';
import RichEditor from 'braft-editor';
import styles from './index.less';

const ID = 'rich-editor';

interface EditorProps {
  value?: string;
  onChange?: (value?: string) => void;
}

interface EditorState {}

class Index extends Component<EditorProps, EditorState> {
  static defaultProps = {
    children: '',
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {
    import('braft-editor/dist/index.css');
    import('braft-extensions/dist/code-highlighter.css');
    import('braft-extensions/dist/table.css');

    let CodeHighlighter = require('braft-extensions/dist/code-highlighter');
    let Table = require('braft-extensions/dist/table');
    let Markdown = require('braft-extensions/dist/markdown');

    RichEditor.use(CodeHighlighter({}));
    RichEditor.use(Table({}));
    RichEditor.use(Markdown({}));
  }

  render() {
    let { value, onChange } = this.props;
    return (
      <div className={styles.rich}>
        <RichEditor
          id={ID}
          value={RichEditor.createEditorState(`${value}`)}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default Index;
