import { defineConfig } from 'dumi';
import chalk from 'chalk';
import { readdirSync } from 'fs';
import { join } from 'path';

const ignorePkgList: any[] = ['index.tsx'];
const pkgList = readdirSync(join(__dirname, 'src')).filter(
  (pkg: string) => pkg.charAt(0) !== '.' && !ignorePkgList.includes(pkg),
);
let path = join(__dirname, 'src', 'index.tsx');

const tailPkgList = pkgList
  .filter(
    (pkg: string) => pkg.charAt(0) !== '.' && !ignorePkgList.includes(pkg),
  )
  .map((path) => [join('src', path)])
  .reduce((acc, val) => acc.concat(val), []);

export default defineConfig({
  title: 'HOCGIN x UI',
  mode: 'site',
  alias: {
    '@hocgin/ui': path,
    '@/': join(__dirname, 'src'),
  },
  // more config: https://d.umijs.org/config
  logo: 'http://cdn.hocgin.top/uPic/mp_logo.png',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/hocgin/react-ui',
    },
  ],
  resolve: { includes: ['docs', ...tailPkgList] },
  apiParser: {
    // 自定义属性过滤配置，也可以是一个函数，用法参考：https://github.com/styleguidist/react-docgen-typescript/#propfilter
    propFilter: {
      // 是否忽略从 node_modules 继承的属性，默认值为 false
      skipNodeModules: false,
      // 需要忽略的属性名列表，默认为空数组
      skipPropsWithName: ['title'],
      // 是否忽略没有文档说明的属性，默认值为 false
      skipPropsWithoutDoc: false,
    },
  },
  // ssr: {},
  exportStatic: {},
  extraBabelPlugins: [
    ['babel-plugin-import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,
    }],
  ],
});
