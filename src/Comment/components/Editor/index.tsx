import React, { Component } from 'react';
import styles from './index.less';
import classNames from 'classnames';
import { Avatar, Button, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface EditorProps {
  title?: string;
  placeholder?: string;
  avatar?: string;
  landed?: boolean;
  replyId?: any;
  replyTitle?: any;
  onClickReply?: (cid?: number, text?: string) => void;
}

interface EditorState {
  content?: string;
}

class Index extends Component<EditorProps, EditorState> {
  private static defaultProps = {
    title: '未登陆',
    placeholder: '写下尊重、理性、友好的评论，有助于彼此更好地交流～',
  };

  state = {
    content: '',
  };

  constructor(props: any, context: any) {
    super(props, context);
  }

  render() {
    let { landed, title, placeholder, avatar, replyId, replyTitle } = this.props;
    return (<div className={classNames(styles.editor)}>
      <div className={styles.left}>
        <Avatar size={40} icon={<UserOutlined />} src={avatar} />
      </div>
      <div className={styles.right}>
        <div className={styles.header}>{title} {replyId && (
          <a href={`#c_${replyId}`} className={styles.reply}>回复 @{replyTitle}</a>)}</div>
        <div><TextArea rows={2} disabled={!landed} bordered={false} placeholder={landed ? placeholder : `检测到暂未登陆，请先进行登陆哈 😄`}
                       onChange={this.onChangeContent.bind(this)} /></div>
        <div>
          <Button size='small' disabled={!landed} onClick={this.onClickReply.bind(this)}>评论</Button>
        </div>
      </div>
    </div>);
  }

  onChangeContent(e: any) {
    this.setState({ content: e?.target?.value });
  }

  onClickReply() {
    let { onClickReply, replyId } = this.props;
    if (onClickReply) {
      onClickReply(replyId, this.state?.content);
    }
  }
}

export default Index;
