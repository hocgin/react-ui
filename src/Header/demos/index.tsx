/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Header, Notification } from '@hocgin/ui';

export default () => {
  return (
    <div style={{ backgroundColor: 'black', height: '500px' } as any}>
      <Header
        style={{ padding: '0 10px 0' } as any}
        mode={'sticky'}
        logo={<Header.TextLogo title={'你好'} />}
        prefix={
          <>
            <Notification.Indicator count={0} />
          </>
        }
        // suffix={<><Notification.Indicator /></>}
        menus={[
          { label: <a href={'www.baidu.com'}>🐰 标题</a> },
          { label: <a href={'www.baidu.com'}>🖍️ 标题</a> },
        ]}
        logined
      />
      <div style={{ height: 500 } as any}>4</div>
    </div>
  );
};
