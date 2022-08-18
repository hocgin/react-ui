```shell
-> Code [MacOS 风格控制台代码]
-> Archive [FORM 表单生成器扩展] => SchemaForm
-> Exhibit [自动识别] => ProField
-> Promise [重 HTTP 请求]
  -> SchemaModal [增加/修改]
  -> SchemaStepModal [增加/修改]
```

### 代办组件

- 气泡组件(类似直播间的左下角的气泡)

| 属性          | 描述         |
| ------------- | ------------ |
| defaultParams | 默认请求参数 |
| useAction     | 请求处理组   |
| initialValues | 初始化值     |
| xx$           | 事件         |

### 包依赖类型

https://yarn.bootcss.com/docs/dependency-types/

### 处理样式通用引入

1. 组件命名规则 `{前缀}-{组件夹名}--{组件内部名}`
2. 组件内引用组件 `@/Loading`
3. 案例引用组件 `import { Loading } @hocgin/ui`
