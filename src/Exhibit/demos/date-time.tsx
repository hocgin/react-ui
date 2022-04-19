/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Exhibit } from '@hocgin/ui';

export default () => {
  return (
    <>
      <Exhibit.DateTime.Picker startAt={'12:00'} endAt={'13:00'} />
      <Exhibit.DateTime.DateTime value={'12:00'} />
      <Exhibit.DateTime.Picker startAt={102212891829} endAt={102212891829} />
    </>
  );
};
