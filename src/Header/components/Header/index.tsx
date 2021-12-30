import React, { useState } from 'react';
import classnames from 'classnames';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './index.less';

const Index: React.FC<{
  menus?: any[];
  className?: string | undefined;
  title?: React.ReactNode | string;
  href?: string;
}> = ({ className, menus = [], title, href = 'https://www.hocgin.top' }, ref) => {
  let [isOpenMenu, setIsOpenMenu] = useState(false);
  return (
    <header className={classnames(styles.topHeader, className)}>
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
    </header>
  );
};

export default Index;
