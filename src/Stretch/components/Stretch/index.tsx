import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FullscreenOutlined, FullscreenExitOutlined, CopyOutlined } from '@ant-design/icons';

interface StretchProps {
  className?: string;
  children?: string | Node;
  maxRow?: number;
}

interface StretchState {
  fullSize?: boolean;
}

class Index extends React.Component<StretchProps, StretchState> {
  private static defaultProps = {};
  state = {
    fullSize: true,
  };

  render() {
    let { fullSize } = this.state;
    let { children, className, maxRow } = this.props;
    let contentStyle = fullSize ? {} : { WebkitLineClamp: maxRow };
    let sizeIcon = fullSize ? <FullscreenExitOutlined /> : <FullscreenOutlined />;
    return (<div className={classnames(styles.stretch, className)}>
      <div className={styles.content} style={{ ...contentStyle }}>{children}</div>
      <div className={styles.toolbar}>
        <span className={styles.copy}><CopyToClipboard text={`${children}`}><CopyOutlined /></CopyToClipboard></span>
        <span onClick={this.onClickResize} className={styles.resize}>{sizeIcon}</span>
      </div>
    </div>);
  }

  onClickResize = () => this.setState(({ fullSize }) => ({ fullSize: !fullSize }));
}

export default Index;
