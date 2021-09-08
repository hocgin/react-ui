import React from 'react';
import styles from './index.less';

interface TplProps {
}

interface TplState {
}

class Index extends React.Component<TplProps, TplState> {
  private static defaultProps = {};

  render() {
    let {} = this.props;
    return (<div className={styles.logo}>
    </div>);
  }
}

export default Index;
