---
category: Components
group: 组件
noinstant: true
title: Redirect - 页面重定向
---

页面重定向

## 代码演示

### 基础用法

```jsx
import React from 'react';
import { Redirect, ConfigProvider } from '@hocgin/ui';

export default () => {
  return (
    <>
      <Redirect className="ok" redirectUrl={'https://www.baidu.com'} />
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

| 参数  | 说明  | 类型  | 默认值 | 版本  |
|-----|-----|-----|-----|-----|
| -   | -   | -   | -   | -   |
