/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React, { useRef } from 'react';
import { Promise } from '@hocgin/ui';
import styles from './index.less';
import { Preview } from '@/Promise/components/Editor';

export default () => {
  return (
    <div>
      <h1>编辑器</h1>
      <Promise.Editor
        editorRef={useRef()}
        id={666}
        title='2022 文稿'
        className={styles.ok}
      />
      <h1>展示</h1>
      <Promise.EditorPreview
        id={666}
        className={styles.preview}
      />
    </div>
  );
};
