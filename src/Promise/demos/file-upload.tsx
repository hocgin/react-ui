/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Promise, Utils } from '@hocgin/ui';
import styles from './index.less';

Utils.Config.setBaseServerUrl('https://api-dev.hocgin.top');
Utils.Config.setHeaders({ ['X-Username']: 'hocgin', ['X-Source']: 'react-ui' });

export default () => {
  return (
    <>
      <Promise.FileUpload />
    </>
  );
};
