/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Promise, Utils } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return (
    <>
      <Promise.FileUpload />
    </>
  );
};
