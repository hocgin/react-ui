/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Code, Utils } from '@hocgin/ui';

export default () => {
  let html = `export default () => {
  return (<>
    <Code lang={'html'}>..</Code>
  </>);
};`;

  // moment/locale/zh-cn
  // moment
  return (
    <>
      <div>{Utils.Format.DateTime.relativeFromNow(new Date().getTime())}</div>
      <Code lang={'html'}>{html}</Code>
    </>
  );
};
