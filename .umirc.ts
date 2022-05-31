import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join, resolve } from 'path';
import * as fs from 'fs';

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
  ignoreMomentLocale: true,
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
      'antd',
    ],
    [
      // https://github.com/umijs/babel-plugin-import#style
      'import',
      {
        libraryName: '@hocgin/ui',
        camel2DashComponentName: false,
        style: (name: string, file: Object) => {
          let packageName = name.replace('@hocgin/ui/lib/', '');
          if (
            [
              'Dom',
              'ConfigProvider',
              'Utils',
              'Format',
              'request',
              'usePost',
              'useDelete',
              'useGet',
              'usePut',
              'Types',
            ].includes(name)
          ) {
            console.info(`组件 ${name} 无需加载样式`);
            return false;
          }
          let stylePath = join(
            __dirname,
            'src',
            packageName,
            'style/index.tsx',
          );
          let hasFile = fs.existsSync(stylePath);

          if (!hasFile) {
            console.info(`[✖] ${packageName} 加载组件样式失败(文件不存在)`);
            return false;
          }
          console.info(`[✔] ${packageName} 加载组件样式成功`);
          // 注意：这里 ./ 表示的是演示的 .md 文件目录
          return stylePath;
        },
      },
    ],
    [
      'prismjs',
      {
        languages: ['javascript', 'css', 'markup'],
        plugins: ['line-numbers'],
        theme: 'twilight',
        css: true,
      },
    ],
  ],
});
