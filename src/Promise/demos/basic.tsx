/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Divider } from 'antd';
import { Promise } from '@hocgin/ui';

export default () => {
  return (
    <>
      <Divider>普通选择器</Divider>
      <Promise.Select action={'https://api-dev.hocgin.top/api/test_select'} />
      <Divider>多选选择器</Divider>
      <Promise.Select multiple={true} action={'https://api-dev.hocgin.top/api/test_select'} />
      <Divider>单选按钮</Divider>
      <Promise.RadioButton action={'https://api-dev.hocgin.top/api/test_select'} />
      <Divider>单选</Divider>
      <Promise.Radio action={'https://api-dev.hocgin.top/api/test_select'} />
      <Divider>复选框</Divider>
      <Promise.Checkbox action={'https://api-dev.hocgin.top/api/test_select'} />
    </>
  );
};
