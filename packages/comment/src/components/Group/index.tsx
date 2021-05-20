import React, { Component } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import Comment from '../Comment';

interface GroupProps {
  children?: Node | Node[];
  bordered?: boolean;
  rowKey?: (item: any) => string;
  pagination?: Boolean;
  dataSource?: any[];
  renderItem?: (item: any) => Node;
}

interface GroupState {}

class Index extends Component<GroupProps, GroupState> {
  private static defaultProps = {
    bordered: false,
    pagination: true,
    dataSource: [],
    renderItem: (item: any) => <Comment {...item} />,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {}

  render() {
    let { children, dataSource, renderItem, rowKey } = this.props;
    return (
      <div className={classNames(styles.commentGroup)}>
        {' '}
        Group
        {dataSource?.map((item, index) => {
          let key = (rowKey && rowKey(item)) || `comment-item-${index}`;
          return <div key={key}>{renderItem && renderItem(item)}</div>;
        })}
      </div>
    );
  }
}

export default Index;
