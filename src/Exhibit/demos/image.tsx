/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Exhibit } from '@hocgin/ui';

export default () => {
  return (
    <>
      <Exhibit.Image.Image src="http://www.baidu.com" />
      <Exhibit.Image.Image
        src="http://cdn.hocgin.top/uPic/mp_logo.png"
        alt="这是一张图片"
      />
      <Exhibit.Image.Avatar src="http://www.baidu.com" />
    </>
  );
};
