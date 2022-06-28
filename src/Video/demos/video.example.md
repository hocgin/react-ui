---

# @formatter:off
title: Video - 视频播放器
nav:
  title: 组件
  path: /components
group:
  path: /
# @formatter:on
---

# Video - 视频播放器

这是一个组件的基础描述

## 代码演示

> Use [ArtPlayer](https://artplayer.org/document/)

### 基础用法

```jsx
import React from 'react';
import { Video, ConfigProvider } from '@hocgin/ui';

export default () => {
  return (
    <>
      <Video
        className="ok"
        getInstance={(art) => console.log(art)}
        src={'https://artplayer.org/assets/sample/video.mp4'}
        option={Video.defaultOption}
      />
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
