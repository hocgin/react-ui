/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Beta, Utils, usePost } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return (
    <>
      <h2>请求 async </h2>
      <Beta.N3Request
        action={async (type: string, args: string[]) => {
          console.log('=>', type, args);
          console.log('请求');
          await Utils.Lang.sleep(5000);
          return '已经5s后了: ' + type + ' - ' + args;
        }}
      />
      <h2>请求 GET url </h2>
      <Beta.N3Request
        manual={true}
        action={async (type: string, args: string[]) => {
          console.log('=>', type, args);
          return usePost('https://api-dev.hocgin.top/api/chaos/proxy/11');
        }}
      />
    </>
  );
};
