// @ts-ignore
import image from '@rollup/plugin-image';

export default {
  disableTypeCheck: true,
  cjs: { type: 'babel', lazy: true },
  esm: {
    type: 'babel',
    minify: false,
    importLibToEs: true,
  },
  extractCSS: false,
  lessInBabelMode: true,
  extraRollupPlugins: [image()],
  // extraBabelPlugins: [
  //   ['babel-plugin-import', {
  //     libraryName: 'antd',
  //     libraryDirectory: 'es',
  //     style: true,
  //   }],
  // ],
};
