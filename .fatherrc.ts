import { IBundleOptions } from 'father-build/src/types';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import path from 'path';

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
    ['transform-remove-console', { exclude: ['error', 'warn', 'info'] }],
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
  ],
  extraRollupPlugins: [
    typescriptPaths({
      tsConfigPath: path.resolve(__dirname, './tsconfig.json'),
    }),
  ],
} as IBundleOptions;
