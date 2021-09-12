/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { config as exhibitConfig } from './scheme-exhibit-config';
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
