import React, { Component } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { Avatar, Button, Tooltip, Input, Popover, Divider } from 'antd';
import { UserOutlined, ClearOutlined, SmileOutlined } from '@ant-design/icons';
import 'emoji-mart/css/emoji-mart.css';
// @ts-ignore
import { Picker } from 'emoji-mart';

const { TextArea } = Input;

interface EditorProps {
  title?: string;
  placeholder?: string;
  avatar?: string;
  landed?: boolean;
  replyId?: any;
  replyTitle?: any;
  onClickReply?: (cid?: number, text?: string) => void;
  onClearReply?: () => void;
  onJump?: (flag?: string) => void;
}

interface EditorState {
  content?: string;
}

class Index extends Component<EditorProps, EditorState> {
  static defaultProps = {
    title: '未登陆',
    placeholder: '写下尊重、理性、友好的评论，让彼此更友好地交流～',
  };

  state = {
    content: '',
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    let {
      landed,
      title,
      placeholder,
      avatar,
      replyId,
      replyTitle,
      onClearReply,
      onJump,
    } = this.props;
    let { content } = this.state;
    return (
      <div className={classNames(styles.editor)}>
        <div className={styles.left}>
          <Avatar size={40} icon={<UserOutlined />} src={avatar} />
        </div>
        <div className={styles.right}>
          <div className={styles.header}>
            {title}{' '}
            {replyId && (
              <>
                <a
                  href={`#c_${replyId}`}
                  className={styles.reply}
                  onClick={() => onJump && onJump(replyId)}
                >
                  回复&nbsp;@{replyTitle}
                </a>
                &nbsp;
                <Tooltip title="取消回复">
                  <Button
                    size="small"
                    shape="circle"
                    icon={<ClearOutlined />}
                    onClick={onClearReply}
                  />
                </Tooltip>
              </>
            )}
          </div>
          <div>
            <TextArea
              rows={2}
              disabled={!landed}
              bordered={false}
              value={content}
              placeholder={
                landed ? placeholder : `检测到暂未登陆，请先进行登陆哈 😄`
              }
              onChange={this.onChangeContent.bind(this)}
            />
          </div>
          <div>
            <Button
              size="small"
              disabled={!landed}
              onClick={this.onClickReply.bind(this)}
            >
              评论
            </Button>
            <Divider type="vertical" />
            <div style={{ display: 'inline-block' }}>
              <Popover
                placement="top"
                content={<Picker onSelect={this.onSelectEmoji.bind(this)} />}
                trigger="click"
              >
                <Button size="small" shape="circle" icon={<SmileOutlined />} />
              </Popover>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onChangeContent(e: any) {
    this.setState({ content: e?.target?.value });
  }

  onClickReply() {
    let { onClickReply, replyId } = this.props;
    onClickReply && onClickReply(replyId, this.state?.content);
    this.setState({ content: '' });
  }

  onSelectEmoji(emoji: any) {
    this.setState(({ content }) => ({
      content: `${content}${emoji.native}`,
    }));
  }
}

export default Index;
