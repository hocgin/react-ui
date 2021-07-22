import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { Logo as GinLogo } from '@hocgin/ui';

interface FeatbarProps {
  title?: string;
  children?: Node;
  feedbackUrl?: string;
  changeLogUrl?: string;
  linkMeUrl?: string;
  helpUrl?: string;
  featureUrl?: string;
  projectUrl?: string;
}

interface FeatbarState {
  visible?: boolean;
  open?: boolean;
}

const DefaultContent = (props: any) => {
  let {
    feedbackUrl,
    changeLogUrl,
    linkMeUrl,
    helpUrl,
    featureUrl,
    projectUrl,
  } = props;

  return (
    <div className={styles.dil}>
      {feedbackUrl && (
        <div>
          <a href={feedbackUrl}>建议反馈</a>
        </div>
      )}
      {changeLogUrl && (
        <div>
          <a href={changeLogUrl}>更新日志</a>
        </div>
      )}
      {helpUrl && (
        <div>
          <a href={helpUrl}>帮助文档</a>
        </div>
      )}
      {projectUrl && (
        <div>
          <a href={projectUrl}>项目列表</a>
        </div>
      )}
      {featureUrl && (
        <div>
          <a href={featureUrl}>新功能</a>
        </div>
      )}
      {linkMeUrl && (
        <div>
          <a href={linkMeUrl}>联系我</a>
        </div>
      )}
    </div>
  );
};

class Index extends React.Component<FeatbarProps, FeatbarState> {
  private static defaultProps = {
    title: 'Hi, 你好! 👏',
    feedbackUrl: 'https://www.yuque.com/gin/topics?label_ids=13074',
    changeLogUrl: 'https://www.yuque.com/gin/changelog',
    helpUrl: 'https://www.yuque.com/gin/help',
    featureUrl: 'https://www.yuque.com/gin/feature',
    linkMeUrl: 'mailto:hocgin@gmail.com',
    projectUrl: 'http://projects.hocg.in',
  };
  state = {
    visible: true,
    open: false,
  };

  render() {
    let { children, title } = this.props;
    let { visible, open } = this.state;

    return (
      <div
        className={classnames(styles.featbar, {
          [styles.visible]: visible,
          [styles.open]: open,
        })}
      >
        <button
          className={classnames(styles.toggle)}
          onClick={this.onToggleOpen}
        >
          {open ? '-' : '+'}
        </button>
        <div className={styles.container}>
          <div className={styles.body}>
            <div className={styles.title}>{title}</div>
            {
              <div className={styles.lbl}>
                {children || <DefaultContent {...this.props} />}
              </div>
            }
          </div>
          <div className={styles.footer}>
            <div className={styles.logo}>
              <GinLogo />
            </div>
            <div className={styles.btn} onClick={this.onClose}>
              关闭
            </div>
          </div>
        </div>
      </div>
    );
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  onToggleOpen = () => {
    this.setState(({ open }) => ({ open: !open }));
  };
}

export default Index;
