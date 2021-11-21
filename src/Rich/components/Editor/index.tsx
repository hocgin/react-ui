import React, { Component } from 'react';
import 'braft-editor/dist/index.css';
import 'braft-extensions/dist/code-highlighter.css';
import 'braft-extensions/dist/table.css';
import styles from './index.less';
import { Utils } from '@/index';

let RichEditor: any = null;

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
    if (Utils.Lang.isServer()) {
      return;
    }

    // 初始化文本
    let initValue = () =>
      this.setState({
        richValue: RichEditor?.createEditorState(this.props?.value, {
          editorId: EDITOR_ID,
        }),
      });

    // 初始化编辑器
    import('braft-editor')
      .then((re) => {
        RichEditor = re.default;
      })
      .finally(() => {
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
      });
  }

  render() {
    let { value, onChange } = this.props;
    let { richValue } = this.state;
    return (
      <div className={styles.rich}>
        {RichEditor && (
          <RichEditor id={EDITOR_ID} value={richValue} onChange={onChange} />
        )}
      </div>
    );
  }
}

export default Index;
