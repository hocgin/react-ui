import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Utils } from '@hocgin/ui';
import { useMount } from 'ahooks';

const EDITOR_ID = 'rich-editor';
const RichEditor: React.FC<any> = ({ value, ...rest }: any) => {
  if (Utils.Lang.isServer()) {
    return <></>;
  }
  let [text, setText] = useState(undefined);

  try {
    let RichEd = require('braft-editor')?.default;
    useMount(() => setText(RichEd?.createEditorState?.(value, { editorId: EDITOR_ID })));
    if (RichEd) {
      require('braft-editor/dist/index.css');
      require('braft-extensions/dist/code-highlighter.css');
      require('braft-extensions/dist/table.css');

      let codeHighlighter = require('braft-extensions/dist/code-highlighter.js');
      if (codeHighlighter) {
        RichEd.use(codeHighlighter.default());
      }

      let table = require('braft-extensions/dist/table.js');
      if (table) {
        RichEd.use(table.default());
      }

      let markdown = require('braft-extensions/dist/markdown.js');
      if (markdown) {
        RichEd.use(markdown.default());
      }
    }
    return <div className={styles.rich}><RichEd value={text} {...rest} /></div>;
  } catch (e) {
    return <div>需要安装 braft-editor</div>;
  }
};

const Index: React.FC<{
  value?: string;
  onChange?: (value?: string) => void;
}> = ({ value, onChange }, ref) => {
  return <RichEditor id={EDITOR_ID} value={value} onChange={onChange} />;
};

export default Index;
