/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Settings } from '@hocgin/ui';
import styles from './index.less';

let groups = [{
  title: '授权',
  menus: [{
    scope: 'user',
    title: '邮箱',
    remark: '邮箱信息',
    items: [{
      writable: true,
      readable: true,
      nullable: false,
      defaultValue: 'defaultValue',
      title: '邮箱号码',
      remark: '这是一个邮箱号码的描述',
      value: 'hocgin@gmail.com',
    }, {
      writable: true,
      readable: false,
      nullable: false,
      defaultValue: 'defaultValue',
      title: '邮箱号码',
      value: 'hocgin@gmail.com',
    }, {
      writable: false,
      readable: true,
      nullable: false,
      defaultValue: 'defaultValue',
      title: '邮箱号码',
      value: 'hocgin@gmail.com',
    }, {
      writable: true,
      readable: true,
      nullable: false,
      type: 'java.lang.Boolean',
      defaultValue: false,
      title: '邮箱号码',
      value: true,
    }, {
      writable: true,
      readable: true,
      nullable: false,
      type: 'java.lang.Boolean',
      defaultValue: false,
      title: '邮箱号码',
      value: true,
    }, {
      writable: true,
      readable: true,
      nullable: false,
      type: 'java.lang.Boolean',
      defaultValue: false,
      title: '邮箱号码',
      value: true,
    }, {
      writable: true,
      readable: true,
      nullable: false,
      type: 'java.lang.Boolean',
      defaultValue: false,
      title: '邮箱号码',
      value: true,
    }, {
      writable: true,
      readable: true,
      nullable: false,
      type: 'java.lang.Boolean',
      defaultValue: false,
      title: '邮箱号码',
      value: true,
    }],
  }, {
    scope: 'user1',
    title: '机构',
  }],
}, {
  title: '授权2',
  menus: [{
    scope: 'user2',
    title: '邮箱',
  }, {
    scope: 'user3',
    title: '机构',
  }],
}];
let user = {
  avatarUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
  name: '张三',
  description: '张三的描述',
};

let useAction = {
  getConfig: async (args: any) => ({
    user: user,
    groups: groups,
  }),
} as any;

export default () => {
  return (
    <>
      <Settings useAction={useAction} className={styles.ok} />
    </>
  );
};
