import React from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  CopyOutlined,
} from '@ant-design/icons';

export interface StretchProps {
  /**
   * 设置样式名
   */
  className?: string;
  children?: string | Node;
  maxRow?: number;
  bordered: boolean;
}

interface StretchState {
  fullSize?: boolean;
}

class Index extends React.Component<StretchProps, StretchState> {
  static defaultProps = {
    bordered: true,
  };
  state = {
    fullSize: true,
  };

  render(): JSX.Element {
    let { fullSize } = this.state;
    let { children, className, maxRow, bordered } = this.props;
    let contentStyle = fullSize ? {} : { WebkitLineClamp: maxRow };
    let sizeIcon = fullSize ? (
      <FullscreenExitOutlined />
    ) : (
      <FullscreenOutlined />
    );
    return (
      <div
        className={classnames(styles.stretch, className, {
          [styles.bordered]: bordered,
        })}
      >
        <div className={styles.content} style={{ ...contentStyle }}>
          {children}
        </div>
        <div className={styles.toolbar}>
          <span className={styles.copy}>
            <CopyToClipboard text={`${children}`}>
              <CopyOutlined />
            </CopyToClipboard>
          </span>
          <span onClick={this.onClickResize} className={styles.resize}>
            {sizeIcon}
          </span>
        </div>
      </div>
    );
  }

  onClickResize = () =>
    this.setState(({ fullSize }) => ({ fullSize: !fullSize }));
}

export default Index;
