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
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'EN' },
  ],
  themeConfig: {
    name: 'HUI',
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
  ],
  resolve: { entryFile: './src/index.tsx' },
  ssr: process.env.NODE_ENV === 'development' ? false : {},
});
