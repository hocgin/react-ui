import React, { useState } from 'react';
import { configResponsive, useResponsive } from 'ahooks';
import classnames from 'classnames';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import './index.less';
import { ConfigContext } from '@/config-provider';

configResponsive({
  small: 0,
  middle: 800,
  large: 1200,
});

type Mode = 'none' | 'fixed' | 'sticky';

const HeaderMenu: React.FC<{
  prefixCls?: string;
  menus?: any[];
  suffix?: any;
  prefix?: any;
}> = ({ menus, prefix, suffix, ...props }) => {
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
          {(menus || []).map(({ href, title }, index) => (
            <li key={index}>
              <a href={href}>{title}</a>
            </li>
          ))}
        </ul>
        {prefix && <PrefixMenu prefixCls={prefixCls}>{prefix}</PrefixMenu>}
        <div
          className={classnames(`${prefixCls}-toggle`, {
            [`active`]: isOpenMenu,
          })}
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          {isOpenMenu ? <CloseOutlined /> : <MenuOutlined />}
        </div>
        {suffix && <SuffixMenu prefixCls={prefixCls}>{suffix}</SuffixMenu>}
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

const Index: React.FC<{
  menus?: any[];
  mode?: Mode;
  className?: string | undefined;
  style?: any;
  containerClassName?: string | undefined;
  containerStyle?: any;
  suffix?: any;
  prefix?: any;
  title?: React.ReactNode | string;
  href?: string;
}> = ({
  className,
  style,
  containerClassName,
  containerStyle,
  mode = 'none',
  menus = [],
  title,
  suffix,
  prefix,
  href = '/',
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
        <a href={href} className={`${prefixCls}-logo`}>
          <span>HOCGIN</span>
          <span className={`${prefixCls}-suffix`}>
            <span className={`${prefixCls}-suffix-dot`}>.</span>
            <span>top</span>
          </span>
          {title && <span className={`${prefixCls}-logo-title`}>{title}</span>}
        </a>
        <HeaderMenu prefix={prefix} suffix={suffix} menus={menus} />
      </div>
    </header>
  );
};

export default Index;
