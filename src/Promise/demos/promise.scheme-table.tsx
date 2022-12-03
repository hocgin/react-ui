/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { config as tableConfig } from './config.scheme-table';
import { Promise } from '@hocgin/ui';
import { config as exhibitConfig } from '@/Promise/demos/config.scheme-exhibit';
import { Divider } from 'antd';

export default () => {
  return (
    <>
      <Promise.TableSchemaConfig config={tableConfig} />
    </>
  );
};
