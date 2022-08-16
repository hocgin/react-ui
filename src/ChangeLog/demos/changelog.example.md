---

# @formatter:off
title: ChangeLog - 变更日志
nav:
  title: 组件
  path: /components
group:
  path: /
# @formatter:on
---

# Tpl - 模版文件

这是一个组件的基础描述

## 代码演示

### 基础用法

```jsx
import React from 'react';
import {ChangeLog} from '@hocgin/ui';

let changelog = [
  {
    title: <>next.计划中</>,
    type: 'next',
    feature: [
      <div>✏️ 多语言支持</div>,
      <div>✏️ 在线壁纸支持</div>,
      <div>✏️ 根据url获取网站图标</div>,
      <div>✏️ 自定义搜索引擎</div>,
      <div hidden>✏️ footer 自定义</div>,
      <div hidden>✏️ 在线分享支持</div>,
    ],
  },
  {
    title: <>v1.1.0</>,
    type: 'current',
    feature: [<div>🎉 新增书签功能</div>, <div>🎉 新增壁纸更换功能</div>],
  },
  {
    title: <>v1.0.0</>,
    feature: [
      <div>🎉 新增配置功能</div>,
      <div>🎉 新增时间组件</div>,
      <div>🔧 修复卡顿问题</div>,
    ],
  },
];

export default () => {
  return (
    <>
      <ChangeLog items={changelog} />
    </>
  );
};
```

```css
.ok {
  color: red;
}
```

## API

### 组件

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |
