/**
 * title: 用于展示详情的组件
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { config as exhibitConfig } from './config.scheme-exhibit';
import { Promise } from '@hocgin/ui';
import { Divider } from 'antd';

export default class Index extends React.PureComponent<{}> {
  state = {};

  render() {
    return (
      <>
        <Promise.ExhibitSchemaConfig config={{ ...exhibitConfig }} />
        <Divider />
      </>
    );
  }
}
