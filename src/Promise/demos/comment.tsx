/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Promise } from '@hocgin/ui';

export default () => {
  return (
    <>
      <Promise.Comment refType={'test'} refId={1} />
    </>
  );
};
