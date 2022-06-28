---
nav:
  title: 快速上手
  order: 1
---

# 快速上手

## 如何使用

#### 安装

```shell
npm install @hocgin/ui

# or

yarn add @hocgin/ui
```

#### 配置自动导入样式

```ts
{
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: '@hocgin/ui',
        camel2DashComponentName: false,
        style: true,
      },
      '@hocgin/ui',
    ],
  ]
}
```

## 组件分类

### 普通组件

### 高阶组件

- Archive [存档组件] => 目前废弃状态，使用 Antd Pro 的 SchemaForm 进行扩展。
- Exhibit [展览组件] => 目前扩展状态，需符合 Antd Pro 的 ProField 方式进行扩展。
- Promise [契约组件] => 契约数据结构快捷使用的构件。
  - Promise.Schema [配置化契约构件]
    - Schema.ArchiveSchemaConfig [存档构件] 新增、修改
    - Schema.DeleteSchemaConfig  [删除构件] 删除
    - Schema.ExhibitSchemaConfig [展览构件] 详情
    - Schema.TableSchemaConfig   [表单构件] 表单查询

## 查看文档

[组件文档](/components)

## 基础依赖

- [Ant Design](https://ant.design/)
- [Ant Design Charts](https://charts.ant.design/)
- [Ant Design Motion](https://motion.ant.design/)
