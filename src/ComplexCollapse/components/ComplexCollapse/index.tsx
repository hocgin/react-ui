import React from 'react';
import styles from './index.less';
import { Collapse } from 'antd';

interface ComplexCollapseProps {
  children?: React.ReactNode | string;
  defaultActiveKey?: Array<string | number> | string | number;
}

interface ComplexCollapseState {}

class Index extends React.PureComponent<
  ComplexCollapseProps,
  ComplexCollapseState
> {
  static Panel = Collapse.Panel;

  render() {
    let { children, defaultActiveKey } = this.props;
    return (
      <div className={styles.component}>
        <Collapse
          expandIconPosition="right"
          bordered={false}
          accordion
          defaultActiveKey={defaultActiveKey}
        >
          {children}
        </Collapse>
      </div>
    );
  }
}

export default Index;
