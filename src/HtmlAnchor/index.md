---
category: Components
group: 组件
noinstant: true
title: HtmlAnchor - HTML 锚点
---

这是一个组件的基础描述

## 代码演示

```jsx
import React from 'react';
import { HtmlAnchor, ConfigProvider } from '@hocgin/ui';
import { Affix } from 'antd';

const content = `
      <h1 name='你好' data-name='h1' active>代码演示</h1>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
        <h2 name='你好' data-name='h1' active>基础用法</h2>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
          <h3 name='你好' data-name='h1' active>api</h3>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
        <h2 name='你好' data-name='h1' active>组件</h2>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
          <h3 name='你好' data-name='h1' active>你好h35你好h35你好h35你好h35你好h35你好h35你好h35你好h35你好h35你好h35你好h35你好h35</h3>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <h1 name='你好' data-name='h1' active>你好h16</h1>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
        <h4 name='你好' data-name='h1' active>你好h47</h4>
`;

export default () => {
  return (
    <div style={{ display: 'flex', 'flex-direction': 'row' }}>
      <div
        style={{ flex: '1' }}
        dangerouslySetInnerHTML={{ __html: HtmlAnchor.setDirectoryAnchor(content) }}
      />
      <div>
        <Affix offsetTop={200}>
          <HtmlAnchor content={content} />
        </Affix>
      </div>
    </div>
  );
};
```

## API

### 组件

| 参数  | 说明  | 类型  | 默认值 | 版本  |
|-----|-----|-----|-----|-----|
| -   | -   | -   | -   | -   |
