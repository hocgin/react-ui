/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Dom, FileUpload } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return (
    <>
      <FileUpload onChange={console.log}
                  maxCount={1}
                  beforeUpload={Dom.validFile.bind(
                    this,
                    'image/jpeg,image/png,image/gif',
                    2 * 1024 * 1024,
                  )}
                  value={[
                    { url: 'https://cdn.hocgin.top/uPic/mp_logo.png', filename: 'unknown' },
                  ]} />
    </>
  );
};
