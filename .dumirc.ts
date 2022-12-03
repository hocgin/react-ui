import { defineConfig } from 'dumi';
import { join, resolve } from 'path';
import * as fs from 'fs';

export const useLogger = () => {
  let result: any = [];
  let offLogger = process.env.USE_LOG !== 'true';
  console.debug(`[${offLogger ? '禁用' : '启用'}]日志打印`);
  if (offLogger) {
    result.push([
      'transform-remove-console',
      { exclude: ['error', 'warn', 'info'] },
    ]);
  }
  return result;
};

export default defineConfig({
  // more config: https://d.umijs.org/config
  themeConfig: {
    name: '@hocgin/ui',
    logo: 'https://cdn.hocgin.top/uPic/mp_logo.png',
  },
  exportStatic: {},
  ignoreMomentLocale: true,
  alias: {
    '@': `${resolve(__dirname, 'src')}`,
  },
  extraBabelPlugins: [
    ...useLogger(),
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
      'antd',
    ],
    [
      // https://github.com/umijs/babel-plugin-import#style
      'import',
      {
        libraryName: '@hocgin/ui',
        camel2DashComponentName: false,
        style: (name: string, file: Object) => {
          let packageName = name.replace('@hocgin/ui/lib/', '');
          if (
            [
              'Dom',
              'ConfigProvider',
              'Utils',
              'Format',
              'request',
              'usePost',
              'useDelete',
              'useGet',
              'usePut',
              'Types',
            ].includes(name)
          ) {
            console.info(`组件 ${name} 无需加载样式`);
            return false;
          }
          let stylePath = join(
            __dirname,
            'src',
            packageName,
            'style/index.tsx',
          );
          let hasFile = fs.existsSync(stylePath);

          if (!hasFile) {
            console.info(`[✖] ${packageName} 加载组件样式失败(文件不存在)`);
            return false;
          }
          console.info(`[✔] ${packageName} 加载组件样式成功`);
          // 注意：这里 ./ 表示的是演示的 .md 文件目录
          return stylePath;
        },
      },
    ],
  ],
  ssr: process.env.NODE_ENV !== 'development',
});
