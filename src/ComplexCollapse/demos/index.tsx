/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { ComplexCollapse, TextRow } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return (
    <ComplexCollapse defaultActiveKey={['1']}>
      <ComplexCollapse.Panel header="基础信息" key="1">
        <TextRow bordered={true} title={'父级名称'}>
          顶级
        </TextRow>
        <TextRow title={'权限名称'}>权限名称</TextRow>
        <TextRow title={'权限类型'}>权限类型</TextRow>
      </ComplexCollapse.Panel>
      <ComplexCollapse.Panel header="关联角色" key="2">
        <TextRow title={'权限名称'}>权限名称</TextRow>
        <TextRow title={'权限类型'}>权限类型</TextRow>
      </ComplexCollapse.Panel>
    </ComplexCollapse>
  );
};
