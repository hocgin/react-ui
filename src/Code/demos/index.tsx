/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Code } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  let html = `export default () => {
  return (<>
    <Code lang={'html'}>..</Code>
  </>);
};`;

  return (
    <>
      <Code lang={'html'}>{html}</Code>
    </>
  );
};
