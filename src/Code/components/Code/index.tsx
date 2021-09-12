import React from 'react';
import styles from './index.less';
import classnames from 'classnames';

export interface CodeProps {
  /**
   * 设置样式名
   */
  className?: string;
  /**
   * 内容
   */
  children?: string | Node;
  /**
   * 编程语言
   */
  lang: string;
  /**
   * 边框
   */
  bordered: boolean;
}

interface CodeState {}

class Index extends React.Component<CodeProps, CodeState> {
  static defaultProps = {
    lang: 'auto',
    bordered: true,
  };

  render(): JSX.Element {
    let { className, children, bordered } = this.props;
    return (
      <div
        className={classnames(styles.component, className, {
          [styles.bordered]: bordered,
        })}
      >
        <code>{children}</code>
      </div>
    );
  }
}

export default Index;
