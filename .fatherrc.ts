// @ts-ignore
import image from '@rollup/plugin-image';

export default {
  disableTypeCheck: true,
  cjs: { type: 'babel', lazy: true },
  esm: { type: 'babel' },
  // cssModules: false,
  extractCSS: true,
  lessInBabelMode: true,
  // runtimeHelpers: true,
  extraRollupPlugins: [image()],
  extraBabelPlugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }],
  ],
};
