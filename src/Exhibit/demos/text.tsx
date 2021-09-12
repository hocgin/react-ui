/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Exhibit } from '@hocgin/ui';

export default () => {
  let code = `function main(){
      console.log('Hi');
     }`;

  return (
    <>
      <Exhibit.Text.Stretch>666</Exhibit.Text.Stretch>
      <Exhibit.Text.Code>{code}</Exhibit.Text.Code>
      <Exhibit.Text.Tag>标签</Exhibit.Text.Tag>
    </>
  );
};
