/**
 * title: 用于操作[新增/修改]的组件
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { config } from './config.scheme-archive';
import { Promise } from '@hocgin/ui';
import { Divider } from 'antd';
import { LangKit } from '@hocgin/hkit';

export default () => {
  if (!LangKit.isBrowser()) {
    return <></>;
  }
  let config1 = { ...config, id: 1, layoutType: 'Form', isUpdate: true };
  let config2 = { ...config, id: 1, isUpdate: true };
  return (
    <>
      <Divider />
      <Promise.ArchiveSchemaConfig key={'schemearchive1'} config={config1} />
      <Divider />
      <Promise.ArchiveSchemaConfig key={'schemearchive2'} config={config} />
      <Divider type="vertical" />
      <Promise.ArchiveSchemaConfig key={'schemearchive3'} config={config2} />
    </>
  );
};
