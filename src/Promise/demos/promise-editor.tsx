/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React, { useRef } from 'react';
import { Promise } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return (
    <div>
      <Promise.Editor
        editorRef={useRef()}
        id={666}
        title="2022 文稿"
        className={styles.ok}
      />
    </div>
  );
};
