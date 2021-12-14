import React, { useState } from 'react';
import styles from './index.less';
import { Utils } from '@hocgin/ui';
import { useMount } from 'ahooks';

const EDITOR_ID = 'rich-editor';
let RichEditor: any = <></>;

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

    let re = require('braft-editor');
    if (re) {
      require('braft-editor/dist/index.css');
      require('braft-extensions/dist/code-highlighter.css');
      require('braft-extensions/dist/table.css');
      RichEditor = re.default;

      let codeHighlighter = require('braft-extensions/dist/code-highlighter.js');
      if (codeHighlighter) {
        RichEditor.use(codeHighlighter.default());
      }

      let table = require('braft-extensions/dist/table.js');
      if (table) {
        RichEditor.use(table.default());
      }

      let markdown = require('braft-extensions/dist/markdown.js');
      if (markdown) {
        RichEditor.use(markdown.default());
      }
    }
  });

  return (
    <div className={styles.rich}>
      {init && <RichEditor id={EDITOR_ID} value={value} onChange={onChange} />}
    </div>
  );
};

export default Index;
