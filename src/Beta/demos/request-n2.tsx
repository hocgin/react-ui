/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Beta, Utils } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return (
    <>
      <h2>请求 async </h2>
      <Beta.N2Request
        action={async (type: string, values: any) => {
          console.log('=>', values, type);
          await Utils.Lang.sleep(5000);
          return {
            success: true,
            data: '已经5s后了: ' + type + ' - ' + JSON.stringify(values),
          };
        }}
      />
      <h2>请求 GET url </h2>
      <Beta.N2Request
        manual={true}
        action={(type: string, values: any) => {
          console.log('=>', values, type);
          return {
            url: 'https://api-dev.hocgin.top/api/chaos/proxy/11',
            method: 'POST',
          };
        }}
      />
    </>
  );
};
