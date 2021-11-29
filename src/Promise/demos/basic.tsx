/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Divider } from 'antd';
import { Promise } from '@hocgin/ui';

export default () => {
  let useAction = {
    initialValues: async () => {
      return [{
        key: 'a1',
        value: '1',
      }, {
        key: 'b1',
        value: '21',
      }, {
        key: 'c1',
        value: '22x1',
      }];
    },
  };
  return (
    <>
      <Divider>普通选择器</Divider>
      <Promise.Select useAction={useAction} />
      <Divider>多选选择器</Divider>
      <Promise.Select multiple={true} useAction={useAction} />
      <Divider>单选按钮</Divider>
      <Promise.RadioButton useAction={useAction} />
      <Divider>单选</Divider>
      <Promise.Radio useAction={useAction} />
      <Divider>复选框</Divider>
      <Promise.Checkbox useAction={useAction} />
    </>
  );
};
