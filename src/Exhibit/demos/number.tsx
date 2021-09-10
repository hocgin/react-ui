/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Exhibit } from '@hocgin/ui';

export default () => {
  return (
    <>
      <Exhibit.Number.Decimal value={1000} />
      <Exhibit.Number.Decimal value={'1,000'} />
    </>
  );
};
