/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Promise } from '@hocgin/ui';
import { LangKit } from '@hocgin/hkit';

export default () => {
  if (!LangKit.isBrowser()) {
    return <></>;
  }
  return (
    <>
      <Promise.FileUpload
        action={`${window.location.origin}/api/com/file/upload`}
      />
    </>
  );
};
