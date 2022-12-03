/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { config } from './config.scheme-tree';
import { Promise } from '@hocgin/ui';

export default () => (<>
  <Promise.TreeSchemaConfig config={config} />
</>);
