/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Header } from '@hocgin/ui';

export default () => {
  return (
    <div style={{ height: '500px' } as any}>
      <Header
        style={{ padding: '0 10px 0' } as any}
        mode={'sticky'}
        menus={[
          { label: <a href={'www.baidu.com'}>🐰 标题</a> },
          { label: <a href={'www.baidu.com'}>🖍️ 标题</a> },
        ]}
        logined
      />
      <div style={{ backgroundColor: 'black', height: 500 } as any}>你好</div>
    </div>
  );
};
