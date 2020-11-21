import { defineConfig } from 'dumi';
import chalk from 'chalk';
import { readdirSync } from 'fs';
import { join } from 'path';

const headPkgList: any[] = [];
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
  (pkg: string) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre: any, pkg: string) => {
  pre[`@hocgin/gin-${pkg}`] = join(__dirname, 'packages', pkg, 'src');
  return {
    ...pre,
  };
}, {});

console.log(`🌼 alias list \n${chalk.blue(Object.keys(alias).join('\n'))}`);

const tailPkgList = pkgList
  .map(path => [join('packages', path, 'src')])
  .reduce((acc, val) => acc.concat(val), []);

export default defineConfig({
  title: 'Gin 组件库',
  mode: 'site',
  // more config: https://d.umijs.org/config
  alias,
  resolve: { includes: [...tailPkgList, 'docs'] },
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/hocgin/gin-components',
    },
  ],
  exportStatic: {},
});
