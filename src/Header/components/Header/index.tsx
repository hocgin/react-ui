import React from 'react';
import classnames from 'classnames';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './index.less';

interface LogoProps {
  menus?: any[];
  className?: string | undefined;
}

interface LogoState {
  isOpenMenu?: boolean;
}

class Index extends React.Component<LogoProps, LogoState> {
  static defaultProps = {
    menus: [],
  };
  state = {
    isOpenMenu: false,
  };

  render() {
    let { isOpenMenu } = this.state;
    let { menus, className } = this.props;
    return (
      <header className={classnames(styles.topHeader, className)}>
        <a href="http://www.hocgin.top/" className={styles.logo}>
          HOCGIN
          <span className={styles.suffix}>
            <span className={styles.dot}>.</span>top
          </span>
        </a>
        <div
          className={classnames(styles.toggle, { [styles.active]: isOpenMenu })}
          onClick={this.onClickToggle}
        >
          {isOpenMenu ? <CloseOutlined /> : <MenuOutlined />}
        </div>
        <ul
          className={classnames(styles.navigation, {
            [styles.active]: isOpenMenu,
          })}
        >
          {(menus || []).map(({ href, title }) => (
            <li>
              <a href={href}>{title}</a>
            </li>
          ))}
        </ul>
      </header>
    );
  }

  onClickToggle = () =>
    this.setState(({ isOpenMenu }) => ({ isOpenMenu: !isOpenMenu }));
}

export default Index;
