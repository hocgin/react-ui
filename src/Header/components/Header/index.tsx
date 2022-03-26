import React, { useState } from 'react';
import { configResponsive, useResponsive } from 'ahooks';
import classnames from 'classnames';
import { Notification } from '@hocgin/ui';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './index.less';
import { Avatar } from 'antd';

configResponsive({
  small: 0,
  middle: 800,
  large: 1200,
});

type Mode = 'none' | 'fixed' | 'sticky';

const HeaderMenu: React.FC<{
  menus?: any[];
}> = ({ menus }) => {
  const responsive = useResponsive();
  let [isOpenMenu, setIsOpenMenu] = useState(responsive?.middle);
  return (
    <>
      <div
        className={classnames(styles.toggle, { [styles.active]: isOpenMenu })}
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      >
        {isOpenMenu ? <CloseOutlined /> : <MenuOutlined />}
      </div>
      <ul
        className={classnames(styles.navigation, {
          [styles.active]: isOpenMenu,
        })}
      >
        {(menus || []).map(({ href, title }, index) => (
          <li key={index}>
            <a href={href}>{title}</a>
          </li>
        ))}
      </ul>
    </>
  );
};

const SuffixMenu: React.FC<{ children?: any }> = ({ children }) => {
  return <div className={styles.suffixMenu}>
    {children}
  </div>;
};

const Index: React.FC<{
  menus?: any[];
  mode?: Mode;
  className?: string | undefined;
  style?: any;
  containerClassName?: string | undefined;
  containerStyle?: any;
  suffix?: any;
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
        href = 'https://www.hocgin.top',
      }) => {
  return (
    <header
      className={classnames(
        styles.header,
        {
          [styles.fixed]: mode === 'fixed',
          [styles.sticky]: mode === 'sticky',
        },
        className,
      )}
      style={style}
    >
      <div
        className={classnames(styles.container, containerClassName)}
        style={containerStyle}
      >
        <a href={href} className={styles.logo}>
          <span>HOCGIN</span>
          <span className={styles.suffix}>
            <span className={styles.dot}>.</span>
            <span>top</span>
          </span>
          {title && <span className={styles.title}>{title}</span>}
        </a>
        <HeaderMenu menus={menus} />
      </div>
      {suffix && <SuffixMenu>{suffix}</SuffixMenu>}
    </header>
  );
};

export default Index;
