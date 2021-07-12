import React, { Component } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { Avatar, Mentions } from 'antd';
import 'antd/dist/antd.css';

interface CommentProps {
  avatarSrc?: String;
  nickname?: String;
  profileUrl?: String;
  createdAt?: String;
  content?: String;
}

interface CommentState {}

class Index extends Component<CommentProps, CommentState> {
  private static defaultProps = {
    nickname: 'hocgin',
    createdAt: '今天 21:10',
    content:
      'pingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingpingping',
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  componentDidMount() {}

  render() {
    let { avatarSrc, nickname, createdAt, profileUrl, content } = this.props;
    return (
      <div className={classNames(styles.commentListItem)}>
        <div className={styles.avatar}>
          <Avatar size={38} src={avatarSrc}>
            U
          </Avatar>
        </div>
        <div className={styles.comment}>
          <div className={styles.floor}>
            <div className={styles.header}>
              <a href={`${profileUrl}`}>
                <div className={styles.commenter}>
                  <span className={styles.nickname}>{nickname}</span>
                  <span className={styles.time}>{createdAt}</span>
                </div>
              </a>
            </div>
            <div className={styles.content}>
              <div className={styles.contentDetail}>{content}</div>
              <div className={styles.actions}>
                <span>回复</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
