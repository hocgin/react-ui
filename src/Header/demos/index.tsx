/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Header, Notification } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return (
    <div style={{ backgroundColor: 'black', height: '500px' } as any}>
      <Header
        style={{ padding: '0 10px 0' } as any}
        mode={'sticky'}
        prefix={<><Notification.Indicator /></>}
        // suffix={<><Notification.Indicator /></>}
        menus={[
          { href: 'www.baidu.com', title: '🐰 标题' },
          { href: 'www.baidu.com', title: '🖍️ 标题' },
        ]}
      />
      <div style={{ height: 500 } as any}>4</div>
    </div>
  );
};
