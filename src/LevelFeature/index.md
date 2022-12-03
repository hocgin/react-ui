---
# @formatter:off
title: LevelFeature - 功能级别
nav:
  title: 组件
  path: /components
group:
  path: /
# @formatter:on
---

# LevelFeature - 功能级别

这是一个组件的基础描述

## 代码演示

### 基础用法

```jsx
import React from 'react';
import { Row, Col } from 'antd';
import { PropertySafetyOutlined } from '@ant-design/icons';
import { LevelFeature, ConfigProvider } from '@hocgin/ui';

let freeItem = {
  title: 'Free',
  badge: ['FREE UPDATES INCLUDED'],
  price: '$0',
  feature: [
    {
      checked: true,
      title: 'Save tab & tab groups to new session',
    },
    {
      title: 'Save tab & tab gr session',
    },
    {
      title: 'Save tagrops to new session',
    },
  ],
  link: [
    {
      title: '详情',
    },
  ],
};
let proItem = {
  title: 'Pro',
  themeColor: '#0c98eb',
  badge: [
    'FREE UPDATES INCLUDED',
    <>
      <PropertySafetyOutlined />
      &nbsp;限时折扣
    </>,
  ],
  price: [
    <>
      $10<small>/月</small>
    </>,
    <>
      $20<small>/年</small>
    </>,
  ],
  feature: [
    {
      checked: true,
      title: 'Save tab & tab groups to new sessionSave tab & tab groups to',
    },
    {
      checked: true,
      title: 'Save tab & tab gr session',
    },
    {
      checked: true,
      title: 'Save tagrops to new session',
    },
  ],
  link: [
    {
      title: '立即购买',
    },
    {
      title: '查看更多',
    },
  ],
};
let ssvipItem = {
  title: 'SSVip',
  themeColor: '#E65B62',
  badge: ['FREE UPDATES', <>👑&nbsp;尊贵会员</>],
  price: [
    <>
      $30<small>/月</small>
    </>,
  ],
  feature: [
    {
      checked: true,
      title: 'Save tab & tab groups ',
    },
    {
      checked: true,
      title: 'Save tab & tab gr session',
    },
    {
      checked: true,
      title: 'Save tagrops to new session',
    },
    {
      checked: true,
      title: 'Save tab & tab gr session',
    },
    {
      checked: true,
      title: 'Save tagrops to new session',
    },
    {
      checked: true,
      title: 'Save tab & tab gr session',
    },
    {
      checked: true,
      title: 'Save tagrops to new session',
    },
  ],
  link: [
    {
      title: '立即购买',
    },
  ],
};

export default () => {
  return (
    <>
      <Row>
        <LevelFeature className="ok" item={freeItem} />
        <LevelFeature className="ok" item={proItem} />
        <LevelFeature className="ok" item={ssvipItem} />
      </Row>
    </>
  );
};
```

## API

### 组件

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |
