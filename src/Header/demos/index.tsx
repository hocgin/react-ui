/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Header, Notification, Link } from '@hocgin/ui';

export default () => {
  return (
    <div style={{ backgroundColor: 'black', height: '500px' }}>
      <Header
        style={{ padding: '0 10px 0' }}
        mode={'sticky'}
        logo={<Header.TextLogo title={'你好'} />}
        prefix={<Notification.Indicator count={0} />}
        // suffix={<><Notification.Indicator /></>}
        menus={[
          { label: <Link href={'www.baidu.com'}>🐰 标题</Link> },
          { label: <Link href={'www.baidu.com'}>🖍️ 标题</Link> },
        ]}
        logined
      />
      <div style={{ height: 500 }}>4</div>
    </div>
  );
};
