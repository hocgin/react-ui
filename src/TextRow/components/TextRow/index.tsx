import React from 'react';
import classnames from 'classnames';
import styles from './index.less';

interface TextRowProps {
  title?: string;
  children?: React.ReactNode | string;
  bordered?: boolean;
  // format?: string;
}

interface TextRowState {}

class Index extends React.PureComponent<TextRowProps, TextRowState> {
  render() {
    let { title, children, bordered } = this.props;
    return (
      <div
        className={classnames(styles.component, {
          [styles.borderTop]: bordered,
        })}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.text}>{children}</span>
      </div>
    );
  }
}

export default Index;
