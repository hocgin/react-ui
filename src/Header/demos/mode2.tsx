/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Header, Link } from '@hocgin/ui';

export default () => {
  return (
    <div style={{ height: '500px' }}>
      <Header
        style={{ padding: '0 10px 0' }}
        logo={<Header.TextLogo title={'Rabbit Pay'} />}
        mode={'sticky'}
        menus={[
          { label: <Link href={'www.baidu.com'}>标题</Link> },
          { label: <Link href={'www.baidu.com'}>标题</Link> },
        ]}
        logined
      />
      <div style={{ backgroundColor: 'black', height: 500 }}>你好</div>
    </div>
  );
};
