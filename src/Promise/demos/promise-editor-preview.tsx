/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React, { useRef } from 'react';
import { Promise, Header, Footer } from '@hocgin/ui';
import styles from './index.less';
import { Divider } from 'antd';

export default () => {
  return (<>
      <div style={{ border: '1px solid rgb(242 242 242)' } as any}>
        <article className={styles.preview}>
          <h1 className={styles.title}>你好👋</h1>
          <Promise.EditorPreview id={666} />
        </article>
      </div>
      <Divider />
      <Footer />
    </>
  );
};
