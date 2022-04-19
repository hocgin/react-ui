import { IBundleOptions } from 'father-build/src/types';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';

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
  lessInBabelMode: true,
  extraBabelPlugins: [
    [
      'babel-plugin-import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
      },
      'antd',
    ],
    [
      'babel-plugin-transform-remove-console',
      { exclude: ['error', 'warn', 'info'] },
    ],
    [
      'babel-plugin-module-resolver',
      {
        root: ['.'],
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
          '@': './src',
          '@@': './src/.umi',
        },
      },
    ],
  ],
  extraRollupPlugins: [typescriptPaths({ tsConfigPath: './tsconfig.json' })],
} as IBundleOptions;
