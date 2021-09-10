import React from 'react';
import styles from './index.less';
import classnames from 'classnames';

export interface TplProps {
  /**
   * 设置样式名
   */
  className?: string;
}

interface TplState {}

class Index extends React.Component<TplProps, TplState> {
  static defaultProps = {};

  render(): JSX.Element {
    let { className } = this.props;
    return <div className={classnames(styles.component, className, {})}></div>;
  }
}

export default Index;
