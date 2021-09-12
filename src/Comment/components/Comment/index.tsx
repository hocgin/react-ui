import React, { createElement, Component, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { Avatar, Mentions, message, Comment, Tooltip } from 'antd';
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  RetweetOutlined,
} from '@ant-design/icons';

interface CommentProps {
  // 评论的ID
  id: number;
  // [评论人] 名称
  title?: string;
  // [评论人] 用户信息链接
  href?: string;
  // 被评论的评论ID
  replyId?: number;
  // [被评论人] 头像
  replyAvatar?: string;
  // [被评论人] 名称
  replyTitle?: string;
  // 登陆状态
  landed?: boolean;

  actions?: Array<React.ReactNode>;
  content?: React.ReactNode;
  children?: React.ReactNode;
  author?: React.ReactNode;
  datetime?: React.ReactNode;
  avatar?: React.ReactNode;
  className?: string;
  type?: 'normal' | 'small';
  action?: string;
  likes?: number;
  disliked?: number;
  onChangeReply?: (cid?: number, title?: string, callback?: () => void) => void;
  onClickDisliked?: (cid?: number) => void;
  onClickLike?: (cid?: number) => void;
  onJump?: (flag: any) => void;
  jumpFlag?: any;
}

interface CommentState {}

class Index extends Component<CommentProps, CommentState> {
  static defaultProps = {
    type: 'normal',
    disliked: 0,
    likes: 0,
  };

  state = {
    likes: this.props?.likes,
    disliked: this.props?.disliked,
    action: this.props?.action,
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    let {
      id,
      className,
      title,
      href,
      avatar,
      datetime,
      content,
      children,
      type,
      replyId,
      replyAvatar,
      replyTitle,
      onJump,
      jumpFlag,
    } = this.props;
    let { action, likes, disliked } = this.state;

    const actions = [
      <Tooltip title="Like">
        <span onClick={this.onClickLike}>
          {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className={styles.commentAction}>{likes}</span>
        </span>
      </Tooltip>,
      <Tooltip title="Dislike">
        <span onClick={this.onDislike}>
          {React.createElement(
            action === 'disliked' ? DislikeFilled : DislikeOutlined,
          )}
          <span className={styles.commentAction}>{disliked}</span>
        </span>
      </Tooltip>,
      <span onClick={this.onClickReply}>回复</span>,
    ];

    return (
      <div
        id={`c_${id}`}
        className={classnames(
          styles.component,
          {
            [styles.small]: type === 'small',
            [styles.activeComment]: jumpFlag === id,
          },
          className,
        )}
      >
        <Comment
          avatar={avatar}
          datetime={
            <>
              {datetime}{' '}
              {replyId && (
                <a
                  href={`#c_${replyId || ''}`}
                  className={styles.reply}
                  onClick={() => onJump && onJump(replyId)}
                >
                  <RetweetOutlined /> <Avatar size={15} src={replyAvatar} />{' '}
                  <span>{replyTitle}</span>
                </a>
              )}
            </>
          }
          author={<a href={href}>{title}</a>}
          content={<p className={styles.content}>{content}</p>}
          actions={actions}
        >
          {children}
        </Comment>
      </div>
    );
  }

  onClickLike = () => {
    let { landed } = this.props;
    if (!landed) {
      message.warn('请先进行登陆');
      return;
    }

    this.setState(
      ({ likes, disliked, action }: any) => {
        if (action === 'disliked') {
          likes += 1;
          disliked -= 1;
          action = 'liked';
        } else if (action === 'liked') {
          likes -= 1;
          action = null;
        } else {
          likes += 1;
          action = 'liked';
        }
        return { likes, disliked, action };
      },
      () => {
        let { id, onClickLike } = this.props;
        onClickLike && onClickLike(id);
      },
    );
  };

  onDislike = () => {
    let { landed } = this.props;
    if (!landed) {
      message.warn('请先进行登陆');
      return;
    }
    this.setState(
      ({ likes, disliked, action }: any) => {
        if (action === 'disliked') {
          disliked -= 1;
          action = null;
        } else if (action === 'liked') {
          likes -= 1;
          disliked += 1;
          action = 'disliked';
        } else {
          disliked += 1;
          action = 'disliked';
        }
        return { likes, disliked, action };
      },
      () => {
        let { id, onClickDisliked } = this.props;
        onClickDisliked && onClickDisliked(id);
      },
    );
  };

  onClickReply = () => {
    let { onChangeReply, id, title } = this.props;
    onChangeReply && onChangeReply(id, title, console.debug);
  };
}

export default Index;
