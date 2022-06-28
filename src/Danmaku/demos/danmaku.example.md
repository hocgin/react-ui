---

# @formatter:off
title: Danmaku - 弹幕
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
import React, { useRef } from 'react';
import { Button } from 'antd';
import { Danmaku, ConfigProvider } from '@hocgin/ui';

export default () => {
  let danmakuRef = useRef();
  return (
    <>
      <Danmaku danmakuRef={danmakuRef}>
        <div style={{
          width: '100%',
          height: 100,
          backgroundColor: 'gray'
        }}>屏幕
        </div>
      </Danmaku>
      <Button onClick={() => {
        var comment = {
          text: 'bla bla',
        };
        danmakuRef.current.danmaku().emit(comment);
      }}>点击</Button>
    </>
  );
};
```

## API

### 组件

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |
