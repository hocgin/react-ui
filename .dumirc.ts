import { defineConfig } from 'dumi';
import { resolve } from 'path';

export const useLogger = () => {
  let result = [];
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
  outputPath: 'docs-dist',
  favicons: ['https://cdn.hocgin.top/uPic/mp_logo.png'],
  themeConfig: {
    name: 'HUI',
    logo: 'https://cdn.hocgin.top/uPic/mp_logo.png',
    footer: false,
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'EN' },
  ],
  exportStatic: {},
  ignoreMomentLocale: true,
  alias: {
    '@': `${resolve(__dirname, 'src')}`,
  },
  extraBabelPlugins: [...useLogger()],
  resolve: { entryFile: './src/index.tsx' },
  ssr: process.env.NODE_ENV === 'development' ? false : {},
});
