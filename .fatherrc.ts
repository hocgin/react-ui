// @ts-ignore
import image from '@rollup/plugin-image';

export default {
  disableTypeCheck: true,
  cjs: { type: 'babel', lazy: true },
  esm: { type: 'babel' },
  extraRollupPlugins: [image()],
};
