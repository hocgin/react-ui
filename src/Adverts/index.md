---
category: Components
group: 组件
noinstant: true
title: Adverts - 广告组件
---

这是一个组件的基础描述

## 代码演示

### 基础用法

```jsx
import React from 'react';
import { Adverts } from '@hocgin/ui';

let defaultAdver = [
  {
    title: '随机',
    flag: '作者自荐',
    imageUrl: 'https://cdn.hocgin.top/uPic/favicon.ico',
    url: 'http://www.baidu.com',
  },
  {
    title: '随机',
    flag: '作者自荐',
    imageUrl:
      'https://cdn.hocgin.top/file/addone-bookmarking_nav-background.png',
    url: 'http://www.baidu.com',
  },
  {
    title: '随机',
    flag: '作者自荐',
    imageUrl: 'https://cdn.hocgin.top/file/20221116_tuijian.png',
    url: 'http://www.baidu.com',
  },
];

export default () => {
  return (
    <>
      <Adverts items={defaultAdver} width={400} height={120} />
    </>
  );
};
```

## API

### 组件

| 参数  | 说明  | 类型  | 默认值 | 版本  |
|-----|-----|-----|-----|-----|
| -   | -   | -   | -   | -   |
