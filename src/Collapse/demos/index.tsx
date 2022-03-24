/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Collapse, TextRow, Exhibit } from '@hocgin/ui';
import styles from './index.less';

export default () => {
  return (
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel header='基础信息' key='1'>
        <TextRow bordered={true} title={'父级名称'}>
          顶级
        </TextRow>
        <TextRow title={'权限名称'}>权限名称</TextRow>
        <TextRow title={'权限类型'}>权限类型</TextRow>
        <TextRow title={'图片'}>
          <Exhibit.Image src={''} />
        </TextRow>
        <TextRow title={'时间'}>
          <Exhibit.DateTime.Picker startAt={'1:00'} endAt={'12:00'} />
        </TextRow>
        <TextRow title={'文本'}>
          <Exhibit.Text.Stretch>sjdkj内容</Exhibit.Text.Stretch>
        </TextRow>
        <TextRow title={'链接'}>
          <Exhibit.Link.Site url={'http://www.hocgin.top'} />
        </TextRow>
      </Collapse.Panel>
      <Collapse.Panel header='关联角色' key='2'>
        <TextRow bordered={true} title={'权限名称'}>
          权限名称
        </TextRow>
        <TextRow title={'权限类型'}>权限类型</TextRow>
      </Collapse.Panel>
    </Collapse>
  );
};
