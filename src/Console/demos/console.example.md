---

# @formatter:off
title: Console - 日志面板
nav:
  title: 组件
  path: /components
group:
  path: /
# @formatter:on
---

# Console - 日志面板

这是一个组件的基础描述

## 代码演示

### 基础用法

```jsx
/**
 * iframe: true
 * transform: true
 * background: "#f0f2f5"
 */
import React, { useEffect } from 'react';
import { Console, ConfigProvider } from '@hocgin/ui';

export default () => {
  useEffect(() => {
    let interval = setInterval(() => {
      console.debug('debug');
      console.log('log');
      console.warn('warn');
      console.error('error');
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <>
      <Console className="ok" />
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
