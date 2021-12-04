/**
 * title: 用于操作[新增/修改]的组件
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { config } from './scheme-archive-config';
import { Promise } from '@hocgin/ui';
import { Divider } from 'antd';

export default class Index extends React.PureComponent<{}> {
  state = {};

  render() {
    let config1 = { ...config, id: 1, layoutType: 'Form', isUpdate: true };
    let config2 = { ...config, id: 1, isUpdate: true };
    return (
      <>
        <Divider />
        <Promise.ArchiveSchemaConfig config={config1} />
        <Divider />
        <Promise.ArchiveSchemaConfig config={config} />
        <Divider type="vertical" />
        <Promise.ArchiveSchemaConfig config={config2} />
      </>
    );
  }
}
