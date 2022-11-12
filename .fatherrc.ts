import { IBundleOptions } from 'father-build/src/types';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import path from 'path';

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

export default {
  esm: 'babel',
  cjs: 'babel',
  umd: {
    name: '@hocgin/ui',
    globals: {
      react: 'React',
      antd: 'antd',
    },
  },
  runtimeHelpers: true,
  extractCSS: true,
  extraBabelPlugins: [
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
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
          '@@': './src/.umi',
        },
      },
    ],
    ...useLogger(),
  ],
  extraRollupPlugins: [
    typescriptPaths({
      tsConfigPath: path.resolve(__dirname, './tsconfig.json'),
    }),
  ],
} as IBundleOptions;
