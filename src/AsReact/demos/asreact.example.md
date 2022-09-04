---

# @formatter:off
title: AsReact - AsReact
nav:
  title: 组件
  path: /components
group:
  path: /
# @formatter:on
---

# AsReact - AsReact

这是一个组件的基础描述

## 代码演示

### 基础用法

```jsx
import React from 'react';
import {AsReact} from '@hocgin/ui';

export default () => {
  let element = document.createElement('b');
  element.textContent = "这是Element标签";
  return (
    <>
      <AsReact children={element} />
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
