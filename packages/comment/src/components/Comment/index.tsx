import React, { Component } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { Avatar, Mentions } from 'antd';

interface CommentProps {
  avatarSrc?: String;
}

interface CommentState {}

class Index extends Component<CommentProps, CommentState> {
  private static defaultProps = {};

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {}

  render() {
    let { avatarSrc } = this.props;
    return (
      <div className={classNames(styles.commentListItem)}>
        <div className={styles.avatar}>
          <Avatar size={64} src={avatarSrc} />
        </div>
        <div className={styles.comment}>
          <div className={styles.floor}>
            <div className={styles.header}>..</div>
            <div className={styles.content}>..</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
