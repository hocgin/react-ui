/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Divider } from 'antd';
import { Promise } from '@hocgin/ui';
import { SearchOption } from '@/Utils/types/rt-grass';

export default () => {
  let useAction = {
    initialValues: async (keyword?: string) => {
      console.log('请求', keyword);
      let str = keyword ?? '';
      return [
        {
          key: 'a1' + str,
          value: '1' + str,
        },
        {
          key: 'b1',
          value: '21',
        },
        {
          key: 'c1',
          value: '22x1',
        },
      ];
    },
  };

  let searchUseAction = {
    initialValues: async (keyword?: string) => {
      let str = keyword ?? '';
      return [
        {
          value: '1.' + str,
          key: '1.' + str,
          image: '1.' + str,
          description: '1.description',
        },
        {
          value: '2.',
          key: '2.' + str,
          image: '2.' + str,
          description: '2.description',
        },
      ] as SearchOption[];
    },
  };

  return (
    <>
      <Divider>编号</Divider>
      <Promise.Encoding prefix={'66'} />
      <Divider>普通选择器</Divider>
      <Promise.Select useAction={useAction} />
      <Promise.Select multiple={true} useAction={useAction} />
      <Divider>搜索选择器</Divider>
      <Promise.Search useAction={searchUseAction} />
      <Promise.Search useAction={searchUseAction} multiple={true} />
      <Divider>单选按钮</Divider>
      <Promise.RadioButton useAction={useAction} />
      <Divider>单选</Divider>
      <Promise.Radio useAction={useAction} />
      <Divider>复选框</Divider>
      <Promise.Checkbox useAction={useAction} />
    </>
  );
};
