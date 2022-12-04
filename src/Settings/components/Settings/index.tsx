import React, { useState } from 'react';
import Menu, { Group } from '../Menu';
import {
  Avatar,
  Divider,
  Input,
  Button,
  Form,
  InputNumber,
  Switch,
} from 'antd';
import {
  ConfigScopeStructType,
  ConfigScopeType,
  UseAction,
} from '@/Settings/components/types';
import { PageHeader } from '@ant-design/pro-layout';
import memoizeOne from 'memoize-one';
import Empty from '@/Empty';
import { LangKit } from '@/_utils';
import { useMount, useRequest } from 'ahooks';
import classnames from 'classnames';

import { ConfigContext } from '@/ConfigProvider';

interface UserProfile {
  avatarSrc?: any;
  title: string;
  description?: string;
}

const LeftMenu: React.FC<{
  prefixCls?: string;
  className?: string;
  groups?: Group[];
  user?: UserProfile;
  activeKey?: string;
  onClick?: (scope: string) => void;
}> = ({ onClick, activeKey, groups = [], user, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('settings--LeftMenu', props.prefixCls);
  return (
    <div className={prefixCls}>
      <div className={'avatar'}>
        <Avatar size={48} src={user?.avatarSrc} />
        <div className={'info'}>
          <span className={'title'}>{user?.title}</span>
          <span className={'description'}>
            {user?.description || '暂无描述'}
          </span>
        </div>
      </div>
      <Menu activeKey={activeKey} onClick={onClick} groups={groups} />
    </div>
  );
};

const RightContent: React.FC<{
  prefixCls?: string;
  scope?: string;
  children?: any;
  result?: any;
}> = ({ result, scope, ...props }) => {
  let map: Record<string, ConfigScopeStructType> = LangKit.toMap2(
    fastToMenu(result),
    'scope',
  );
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('settings--RightContent', props.prefixCls);
  let listItem: ConfigScopeStructType = map[`${scope}`];
  let fileds = (listItem?.items || []).filter(({ readable }) => readable);
  return (
    <div className={prefixCls}>
      {scope ? (
        <>
          <PageHeader
            className={'header'}
            title={listItem?.title}
            subTitle={listItem?.remark}
          />
          <div className={'body'}>
            {fileds.map((item, index) => {
              let { nullable, title, writable, type, itemId = 'item' } = item;
              let rules = [
                { required: !nullable, message: `"${title}"不能为空` },
              ];
              let isLast = index === fileds.length - 1;
              let disabled = !writable;
              return (
                <>
                  <h4>{item?.title}</h4>
                  {item?.remark && <p className={'remark'}>{item?.remark}</p>}
                  <Form
                    requiredMark={false}
                    layout='inline'
                    initialValues={
                      {
                        [`${itemId}`]: item?.value || item?.defaultValue,
                      } as any
                    }
                  >
                    {(() => {
                      let el: any = null;
                      if (['java.lang.Boolean'].includes(type)) {
                        return (
                          <Form.Item
                            name={`${itemId}`}
                            rules={rules}
                            valuePropName='checked'
                          >
                            <Switch disabled={disabled} />
                          </Form.Item>
                        );
                      } else if (['java.lang.Integer'].includes(type)) {
                        el = <InputNumber disabled={disabled} />;
                      } else {
                        el = <Input disabled={disabled} />;
                      }
                      return (
                        <>
                          <Form.Item name={`${itemId}`} rules={rules}>
                            {el}
                          </Form.Item>
                          <Form.Item>
                            <Button disabled={disabled} htmlType='submit'>
                              保存
                            </Button>
                          </Form.Item>
                        </>
                      );
                    })()}
                  </Form>
                  {!isLast && (
                    <Divider orientation='left' orientationMargin={0} />
                  )}
                </>
              );
            })}
          </div>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export const Settings: React.FC<{
  prefixCls?: string;
  className?: string;
  activeKey?: string;
  useAction: UseAction;
}> = ({ useAction, className, ...props }) => {
  let [activeKey, setActiveKey] = useState<string | undefined>(
    props?.activeKey,
  );
  let [result, setResult] = useState<ConfigScopeType>({} as any);
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('settings', props.prefixCls);

  let getConfig = useRequest(LangKit.nilService(useAction?.getConfig, {}), {
    manual: true,
    onSuccess: setResult,
  });
  useMount(() => getConfig.runAsync());

  return (
    <div className={classnames(prefixCls, className)}>
      <LeftMenu
        activeKey={activeKey}
        onClick={setActiveKey}
        groups={fastToGroup(result)}
        user={fastToUser(result)}
      />
      <RightContent scope={activeKey} result={result} />
    </div>
  );
};

let toUser = (result: ConfigScopeType) => ({
  avatarSrc: result?.user?.avatarUrl,
  title: result?.user?.name,
  description: result?.user?.description,
});
let fastToUser = memoizeOne(toUser);

let toGroup = (result: ConfigScopeType) =>
  (result?.groups || []).map((group) => ({
    title: group.title,
    menus: (group.menus || []).map((menu) => ({
      scope: menu.scope,
      title: menu.title,
    })),
  }));
let fastToGroup = memoizeOne(toGroup);

let toMenu = (result: ConfigScopeType) =>
  (result?.groups || []).flatMap((group) =>
    (group.menus || []).map(
      (menu) =>
        ({
          ...menu,
        } as ConfigScopeStructType),
    ),
  );
let fastToMenu = memoizeOne(toMenu);
