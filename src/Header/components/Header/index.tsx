import React, { useState } from 'react';
import { configResponsive, useResponsive } from 'ahooks';
import classnames from 'classnames';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';

import { ConfigContext } from '@/ConfigProvider';
import { Button, Divider } from 'antd';

configResponsive({
  small: 0,
  middle: 800,
  large: 1200,
});

type Mode = 'none' | 'fixed' | 'sticky';

type Props = {
  prefixCls?: string;
  menus?: { label: any }[];
  suffix?: any;
  prefix?: any;
};
const HeaderMenu: React.FC<Props> = ({ menus, prefix, suffix, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('header-menu', props.prefixCls);
  const responsive = useResponsive();
  let [isOpenMenu, setIsOpenMenu] = useState(responsive?.middle);

  return (
    <div className={classnames(`${prefixCls}`)}>
      <div className={`${prefixCls}-action`}>
        <ul
          className={classnames(`${prefixCls}-navigation`, {
            [`active`]: isOpenMenu,
          })}
        >
          {(menus || []).map(({ label }, index) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
        {prefix && <PrefixMenu prefixCls={prefixCls}>{prefix}</PrefixMenu>}
        {!responsive?.middle && (
          <div
            className={classnames(`${prefixCls}-toggle`, {
              [`active`]: isOpenMenu,
            })}
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            {isOpenMenu ? <CloseOutlined /> : <MenuOutlined />}
          </div>
        )}
        {suffix && <SuffixMenu prefixCls={prefixCls}>{suffix}</SuffixMenu>}
        <Divider type="vertical" />
        <a className={`${prefixCls}-login`} href="/login">
          登陆
        </a>
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
        {title && <span className={`${prefixCls}-logo-title`}>{title}</span>}
      </div>
    </>
  );
};

const Index: React.FC<{
  menus?: { label: any }[];
  mode?: Mode;
  className?: string | undefined;
  style?: any;
  containerClassName?: string | undefined;
  containerStyle?: any;
  suffix?: any;
  prefix?: any;
  logo?: any;
}> = ({
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
        style={containerStyle}
      >
        {logo}
        <HeaderMenu prefix={prefix} suffix={suffix} menus={menus} />
      </div>
    </header>
  );
};

export default Index;
