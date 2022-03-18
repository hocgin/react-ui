---
# @formatter:off
title: Comment - 评论
nav:
  title: 组件
  path: /components
group:
  path: /
# @formatter:on
---

# Comment

这是一个组件的基础描述

## 代码演示

### 基础用法

Demo:

<code src="./demos/index.tsx"  background="#f0f2f5" transform="true" inline/>

## 参数

### Action

| 请求类型 | 参数类型          | 响应类型        | 说明                     |
| -------- | ----------------- | --------------- | ------------------------ |
| reply    | ReplyParamsType   | ReplyDataType   | 回复(文章、评论)         |
| show     | ShowParamsType    | ShowDataType    | 显示评论(根评论、子评论) |
| like     | LikeParamsType    | LikeDataType    | 点赞                     |
| dislike  | DislikeParamsType | DislikeDataType | 倒赞                     |
| user     | UserParamsType    | UserDataType    | 获取当前用户信息         |
