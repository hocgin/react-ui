import React, { useState } from 'react';
import styles from './index.less';
import { Utils } from '@hocgin/ui';
import { useMount } from 'ahooks';

const EDITOR_ID = 'rich-editor';
let RichEditor: any = undefined;

const Index: React.FC<{
  value?: string;
  onChange?: (value?: string) => void;
}> = (props, ref) => {
  let { onChange } = props;
  let [value, setValue] = useState(props?.value || '');
  let [init, setInit] = useState(false);

  let onFinally = () => {
    setValue(RichEditor?.createEditorState(value, { editorId: EDITOR_ID }));
    setInit(true);
  };

  useMount(() => {
    if (Utils.Lang.isServer()) {
      return;
    }
    import('braft-editor/dist/index.css');
    import('braft-extensions/dist/code-highlighter.css');
    import('braft-extensions/dist/table.css');

    import('braft-editor')
      .then((re) => (RichEditor = re.default))
      .catch(console.error)
      .finally(() => {
        // @ts-ignore
        import('braft-extensions/dist/code-highlighter.js')
          .then((CodeHighlighter) => RichEditor.use(CodeHighlighter.default()))
          .catch(console.error)
          .finally(() => {
            // @ts-ignore
            import('braft-extensions/dist/table.js')
              .then((Table) => RichEditor.use(Table.default()))
              .catch(console.error)
              .finally(() => {
                // @ts-ignore
                import('braft-extensions/dist/markdown.js')
                  .then((Markdown) => RichEditor.use(Markdown.default()))
                  .catch(console.error)
                  .finally(onFinally);
              });
          });
      });
  });

  return (
    <div className={styles.rich}>
      {init && <RichEditor id={EDITOR_ID} value={value} onChange={onChange} />}
    </div>
  );
};

export default Index;
