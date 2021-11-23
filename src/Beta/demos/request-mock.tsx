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
      <Beta.Request
        request={async (values, props) => {
          console.log('=>', values, props);
          await Utils.Lang.sleep(5000);
          return {
            success: true,
            data: '已经5s后了',
          };
        }}
      />
    </>
  );
};
