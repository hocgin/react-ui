/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Divider } from 'antd';
import { Promise } from '@hocgin/ui';
import { SearchOption } from '@/_types';
import { LangKit } from '@hocgin/hkit';

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
export default () => {
  if (!LangKit.isBrowser()) {
    return <></>;
  }

  return (
    <>
      <Divider>编号</Divider>
      <Promise.Encoding prefix={'66'} />
      <Divider>地址</Divider>
      <Promise.SearchLbs
        value={{
          adcode: '350203',
          address: '福建省厦门市思明区筼筜街道体育路95号厦门文化艺术中心',
          location: { lat: 24.490474, lng: 118.11022 },
          name: '厦门文化艺术中心',
        }}
        onChange={console.log}
      />
      <Divider>普通选择器</Divider>
      <Promise.Select useAction={useAction} />
      <Promise.Select multiple={true} useAction={useAction} />
      <Divider>搜索选择器</Divider>
      <Promise.Search useAction={searchUseAction} defaultValue={'默认'} />
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
