/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Exhibit } from '@hocgin/ui';

export default () => {
  return (
    <>
      <Exhibit.Link.Site url="http://www.baidu.com" />
      <Exhibit.Link.File
        url="http://cdn.hocgin.top/uPic/mp_logo.png"
        title="这是一张图片"
      />
      <Exhibit.Link.File
        url="http://cdn.hocgin.top/uPic/mp_logoxx.png"
        title="这是一张图片"
      />
      <Exhibit.Link.Download
        url="http://cdn.hocgin.top/uPic/mp_logoxx.png"
        title="这是一张图片"
      />
    </>
  );
};
