import { defineConfig } from 'father';
import { resolve } from 'path';
import { IFatherConfig } from 'father/dist/types';

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
  platform: 'browser',
  esm: {},
  cjs: {},
  alias: {
    '@': resolve(__dirname, './src'),
    '@@': resolve(__dirname, './src/.dumi/tmp'),
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
});
