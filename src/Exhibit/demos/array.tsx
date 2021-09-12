/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Exhibit } from '@hocgin/ui';

export default () => {
  return (
    <>
      <Exhibit.Array.Image
        src={[
          'http://www.baidu.com',
          'http://www.baidu.com',
          'http://www.baidu.com',
        ]}
      />
      <Exhibit.Array.Tag value={['苹果', '李子', '梨']} />
    </>
  );
};
