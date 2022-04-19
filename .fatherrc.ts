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
  extraRollupPlugins: [typescriptPaths({ tsConfigPath: './tsconfig.json' })],
} as IBundleOptions;
