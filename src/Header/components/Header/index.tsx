import React, { useState } from 'react';
import classnames from 'classnames';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './index.less';
import { useScroll } from 'ahooks';

type Mode = 'none' | 'fixed' | 'sticky';

const Index: React.FC<{
  menus?: any[];
  mode?: Mode;
  className?: string | undefined;
  style?: any;
  containerClassName?: string | undefined;
  containerStyle?: any;
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
  href = 'https://www.hocgin.top',
}) => {
  let [isOpenMenu, setIsOpenMenu] = useState(false);

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
      </div>
    </header>
  );
};

export default Index;
