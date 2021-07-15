// @ts-ignore
import image from '@rollup/plugin-image';

export default {
  disableTypeCheck: true,
  cjs: { type: 'rollup' },
  esm: { type: 'rollup' },
  extraRollupPlugins: [image()],
};
