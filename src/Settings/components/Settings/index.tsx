import React, { useState } from 'react';
import Menu, { Group } from '../Menu';
import styles from './index.less';
import { Avatar, Divider, PageHeader, Input, Button, Form, InputNumber, Switch } from 'antd';
import { ConfigScopeItemType, ConfigScopeStructType, ConfigScopeType, UseAction } from '@/Settings/components/types';
import memoizeOne from 'memoize-one';
import { Empty, Utils } from '@hocgin/ui';
import { useMount, useRequest } from 'ahooks';
import classnames from 'classnames';

interface UserProfile {
  avatarSrc?: any;
  title: string;
  description?: string;
}

const LeftMenu: React.FC<{
  className?: string;
  groups?: Group[];
  user?: UserProfile;
  activeKey?: string;
  onClick?: (scope: string) => void;
}> = ({ onClick, activeKey, groups = [], user }) => {
  return (
    <div className={styles.left}>
      <div className={styles.avatar}>
        <Avatar size={48} src={user?.avatarSrc} />
        <div className={styles.info}>
          <span className={styles.title}>{user?.title}</span>
          <span className={styles.description}>{user?.description || '暂无描述'}</span>
        </div>
      </div>
      <Menu activeKey={activeKey} onClick={onClick} groups={groups} />
    </div>
  );
};

const RightContent: React.FC<{ scope?: string; children?: any; result?: any }> = ({ result, scope, children }) => {
  let map: Record<string, ConfigScopeStructType> = Utils.Lang.toMap(fastToMenu(result), 'scope');
  let listItem: ConfigScopeStructType = map[`${scope}`];
  let fileds = (listItem?.items || []).filter(({ readable }) => readable);
  return <div className={styles.right}>
    {scope ? <>
      <PageHeader className={styles.header} title={listItem?.title} subTitle={listItem?.remark} />
      <div className={styles.body}>
        {fileds.map((item, index) => {
          let { nullable, title, writable, type, itemId = 'item' } = item;
          let rules = [{ required: !nullable, message: `"${title}"不能为空` }];
          let isLast = (index === fileds.length - 1);
          let disabled = !writable;
          return <>
            <h4>{item?.title}</h4>
            {item?.remark && <p className={styles.remark}>{item?.remark}</p>}
            <Form requiredMark={false} layout='inline'
                  initialValues={{ [`${itemId}`]: (item?.value || item?.defaultValue) } as any}>
              {() => {
                let el: any = null;
                if (['java.lang.Boolean'].includes(type)) {
                  return <Form.Item name={`${itemId}`} rules={rules} valuePropName='checked'>
                    <Switch disabled={disabled} />
                  </Form.Item>;
                } else if (['java.lang.Integer'].includes(type)) {
                  el = <InputNumber disabled={disabled} />;
                } else {
                  el = <Input disabled={disabled} />;
                }
                return <>
                  <Form.Item name={`${itemId}`} rules={rules}>
                    {el}
                  </Form.Item>
                  <Form.Item>
                    <Button disabled={disabled} htmlType='submit'>保存</Button>
                  </Form.Item>
                </>;
              }}
            </Form>
            {!isLast && <Divider orientation='left' orientationMargin={0} />}
          </>;
        })}
      </div>
    </> : <Empty />}
  </div>;
};


export const Settings: React.FC<{
  className?: string;
  activeKey?: string;
  useAction: UseAction;
}> = ({ useAction, className, ...props }) => {
  let [activeKey, setActiveKey] = useState<string | undefined>(props?.activeKey);
  let [result, setResult] = useState<ConfigScopeType>({} as any);

  let getConfig = useRequest(Utils.Lang.nilService(useAction?.getConfig, {}), {
    manual: true,
    onSuccess: setResult,
  });
  useMount(() => getConfig.runAsync());

  return <div className={classnames(styles.component, className)}>
    <LeftMenu activeKey={activeKey} onClick={setActiveKey} groups={fastToGroup(result)} user={fastToUser(result)} />
    <RightContent scope={activeKey} result={result} />
  </div>;
};

let toUser = (result: ConfigScopeType) => ({
  avatarSrc: result?.user?.avatarUrl,
  title: result?.user?.name,
  description: result?.user?.description,
});
let fastToUser = memoizeOne(toUser);

let toGroup = (result: ConfigScopeType) => (result?.groups || [])
  .map(group => ({
    title: group.title, menus: (group.menus || []).map(menu => ({
      scope: menu.scope,
      title: menu.title,
    })),
  }));
let fastToGroup = memoizeOne(toGroup);

let toMenu = (result: ConfigScopeType) => (result?.groups || [])
  .flatMap(group => (group.menus || []).map(menu => ({
    ...menu,
  } as ConfigScopeStructType)));
let fastToMenu = memoizeOne(toMenu);
