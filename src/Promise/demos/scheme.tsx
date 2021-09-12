/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { config } from './scheme-config';
import { Promise } from '@hocgin/ui';
import { Divider } from 'antd';

export default class Index extends React.PureComponent<{}> {
  state = {};

  render() {
    return (
      <>
        <Promise.ExhibitSchemaConfig config={{ ...config, action: `${config.action}/1` }} />
        <Divider />
        <Promise.ArchiveSchemaConfig config={{ ...config, id: 1, layoutType: 'Form' }} />
        <Divider />
        <Promise.ArchiveSchemaConfig config={config} />
        <Divider type='vertical' />
        <Promise.ArchiveSchemaConfig config={{ ...config, id: 1 }} />
      </>
    );
  }

  async initialValues() {
    return {
      title: 'ok',
    };
  }

  async onFinish(values: any) {
    console.log('onFinish', values);
  }
}
