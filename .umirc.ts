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

console.log(tailPkgList);

export default defineConfig({
  title: 'HOCGIN x UI',
  mode: 'site',
  alias: {
    '@hocgin/ui': path,
  },
  // more config: https://d.umijs.org/config
  logo: 'http://cdn.hocgin.top/uPic/mp_logo.png',
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/hocgin/gin-components',
    },
  ],
  resolve: { includes: [...tailPkgList, 'docs'] },
  // ssr: {},
  exportStatic: {},
});
