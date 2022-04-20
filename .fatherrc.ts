import { IBundleOptions } from 'father-build/src/types';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { resolve, join } from 'path';

export default {
  esm: 'babel',
  cjs: 'babel',
  umd: {
    globals: {
      react: 'React',
      antd: 'antd',
    },
  },
  runtimeHelpers: true,
  extractCSS: true,
  lessInBabelMode: {
    paths: [resolve(__dirname, 'node_modules')],
    // @ts-ignore
    javascriptEnabled: true,
  },
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
    ['transform-remove-console', { exclude: ['error', 'warn', 'info'] }],
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
          '@@': './src/.umi',
          '@hocgin/ui': './src',
        },
      },
    ],
  ],
  extraRollupPlugins: [typescriptPaths({ tsConfigPath: './tsconfig.json' })],
} as IBundleOptions;
