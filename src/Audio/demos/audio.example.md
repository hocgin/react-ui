---

# @formatter:off
title: Audio - 音频播放器
nav:
  title: 组件
  path: /components
group:
  path: /
# @formatter:on
---

# Audio - 音频播放器
> [APlayer](https://aplayer.js.org/#/zh-Hans/)

这是一个组件的基础描述

## 代码演示

### 基础用法

```jsx
import React from 'react';
import { Audio, ConfigProvider } from '@hocgin/ui';

export default () => {
  return (
    <>
      <Audio
        getInstance={(audio) => console.log(audio)}
        src={['http://cdn.hocgin.top/file/obj_w5rDlsOJwrLDjj7CmsOj_8954991913_e1af_5c28_d2de_1962f4d1c90ceae1463ca2767ea821ae.m4a',
          'http://cdn.hocgin.top/file/obj_w5rDlsOJwrLDjj7CmsOj_8954991913_e1af_5c28_d2de_1962f4d1c90ceae1463ca2767ea821ae.m4a']}
        option={Audio.defaultOption}
        className="ok" />
    </>
  );
};
```

```css
.ok {
  /*color: red;*/
}
```

## API

### 组件

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| ---- | ---- | ---- | ------ | ---- |
| -    | -    | -    | -      | -    |
