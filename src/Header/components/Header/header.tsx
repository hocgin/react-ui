import React, { useEffect, useState } from 'react';
import { useResponsive, useRequest, configResponsive } from 'ahooks';
import classnames from 'classnames';
import {
  MenuOutlined,
  CloseOutlined,
  LoadingOutlined,
} from '@ant-design/icons';

import { ConfigContext } from '@/ConfigProvider';
import { Button, Divider } from 'antd';
import { DoveService } from '@/Request';
import { PromiseKit } from '@hocgin/hkit';
import Promise from '../../../Promise';
import qs from 'query-string';
import Icon from '@/Icon';

type Mode = 'none' | 'fixed' | 'sticky';

configResponsive({ small: 0, middle: 800, large: 1200 });

type Props = {
  prefixCls?: string;
  menus?: { label: any }[];
  suffix?: JSX.Element;
  prefix?: JSX.Element;
  logined?: boolean;
};
const HeaderMenu: React.FC<Props> = ({ menus, prefix, suffix, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('header-menu', props.prefixCls);
  const responsive = useResponsive();
  let [isOpenMenu, setIsOpenMenu] = useState(responsive?.middle);
  let [user, setUser] = useState<any>(PromiseKit.CacheKit.getUser());
  let { run, loading } = useRequest(
    async () => await DoveService.getCurrentUser(false),
    {
      manual: true,
      onSuccess: (data) => {
        PromiseKit.CacheKit.setUser(data);
        setUser(data);
      },
      onError: (e) => {
        PromiseKit.CacheKit.clearUser();
        PromiseKit.CacheKit.clearToken();
      },
    },
  );
  useEffect(() => {
    let token = PromiseKit.CacheKit.getToken();
    if (!token || user) return;
    run();
  }, []);

  // 检查是否有 token
  // 1. 有，获取用户信息，获取错误则删除 token
  // 2. 没有，不处理

  return (
    <div className={classnames(`${prefixCls}`)}>
      <div className={`${prefixCls}-action`}>
        <ul
          className={classnames(`${prefixCls}-navigation`, {
            [`active`]: menus?.length && isOpenMenu,
          })}
        >
          {(menus || []).map(({ label }, index) => (
            <li className={`${prefixCls}-navigation-item`} key={index}>
              {label}
            </li>
          ))}
        </ul>
        {prefix && <PrefixMenu prefixCls={prefixCls}>{prefix}</PrefixMenu>}
        {menus?.length && !responsive?.middle ? (
          <div
            className={classnames(`${prefixCls}-toggle`, {
              [`active`]: isOpenMenu,
            })}
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            {isOpenMenu ? <CloseOutlined /> : <MenuOutlined />}
          </div>
        ) : (
          <></>
        )}
        {suffix && <SuffixMenu prefixCls={prefixCls}>{suffix}</SuffixMenu>}
        {props?.logined && (
          <>
            <Divider type="vertical" style={{ marginLeft: 14 }} />
            {!user ? (
              loading ? (
                <>
                  <LoadingOutlined />
                </>
              ) : (
                <>
                  <Button
                    onClick={() =>
                      window.open(
                        `/login?${qs.stringify({
                          redirectUrl:
                            typeof window !== 'undefined'
                              ? window?.location?.href
                              : '',
                        })}`,
                        `_self`,
                      )
                    }
                  >
                    注册
                  </Button>
                  <Button
                    type="primary"
                    className={`${prefixCls}-login`}
                    onClick={() =>
                      window.open(
                        `/login?${qs.stringify({
                          redirectUrl:
                            typeof window !== 'undefined'
                              ? window?.location?.href
                              : '',
                        })}`,
                        `_self`,
                      )
                    }
                  >
                    登陆
                  </Button>
                </>
              )
            ) : (
              <Promise.UserAvatar defaultParams={user} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

const SuffixMenu: React.FC<{
  children?: any;
  prefixCls?: string;
}> = ({ prefixCls, children }) => (
  <div className={`${prefixCls}-suffixMenu`}>{children}</div>
);
const PrefixMenu: React.FC<{
  children?: any;
  prefixCls?: string;
}> = ({ prefixCls, children }) => (
  <div className={`${prefixCls}-prefixMenu`}>{children}</div>
);

export const TextLogo: React.FC<{
  prefixCls?: string;
  title?: string;
  prefix?: string;
  suffix?: string;
}> = ({ prefix = 'HOCGIN', suffix = 'top', title, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('header', props.prefixCls);
  return (
    <>
      <div className={`${prefixCls}-logo`}>
        <span>{prefix}</span>
        <span className={`${prefixCls}-suffix`}>
          <span className={`${prefixCls}-suffix-dot`}>.</span>
          <span>{suffix}</span>
        </span>
        {title && (
          <div className={`${prefixCls}-logo-title-wrapper`}>
            <Icon.Geist className={`${prefixCls}-logo-title-icon`} />
            <span className={`${prefixCls}-logo-title`}>{title}</span>
          </div>
        )}
      </div>
    </>
  );
};

type HeaderProps = {
  menus?: { label: any }[];
  mode?: Mode;
  className?: string | undefined;
  style?: any;
  containerClassName?: string | undefined;
  containerStyle?: any;
  suffix?: any;
  prefix?: any;
  logo?: any;
  logined?: boolean;
  maxWidth?: number | any;
};
const Header: React.FC<HeaderProps> = ({
  className,
  style,
  containerClassName,
  containerStyle,
  mode = 'none',
  menus = [],
  suffix,
  prefix,
  logo = (
    <a href={'/'}>
      <TextLogo />
    </a>
  ),
  logined,
  maxWidth = 1024,
}) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('header');
  return (
    <header
      className={classnames(
        `${prefixCls}`,
        {
          [`${prefixCls}-fixed`]: mode === 'fixed',
          [`${prefixCls}-sticky`]: mode === 'sticky',
        },
        className,
      )}
      style={style}
    >
      <div
        className={classnames(`${prefixCls}-container`, containerClassName)}
        style={{ maxWidth, ...containerStyle }}
      >
        {logo}
        <HeaderMenu
          prefix={prefix}
          suffix={suffix}
          menus={menus}
          logined={logined}
        />
      </div>
    </header>
  );
};

export default Header;
