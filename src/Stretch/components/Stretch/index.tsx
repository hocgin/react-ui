import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './index.less';
import { useInterval, useTimeout } from 'ahooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  CopyOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const Index: React.FC<{
  className?: string;
  children?: string | Node;
  maxRow?: number;
  bordered: boolean;
}> = ({ children, className, maxRow, bordered = true, ...rest }) => {
  let [fullSize, setFullSize] = useState(true);
  let [copied, setCopied] = useState(false);

  let contentStyle = fullSize ? {} : { WebkitLineClamp: maxRow };
  let sizeIcon = fullSize ? <FullscreenExitOutlined /> : <FullscreenOutlined />;

  let onCopy = () => {
    if (!copied) {
      setCopied(true);
    }
  };
  useInterval(() => setCopied?.(false), 2000);

  let checkStyle = { color: '#00B06D' };

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
          {copied ? (
            <CheckOutlined style={checkStyle} />
          ) : (
            <CopyToClipboard text={`${children}`} onCopy={onCopy}>
              <CopyOutlined />
            </CopyToClipboard>
          )}
        </span>
        <span onClick={() => setFullSize(!fullSize)} className={styles.resize}>
          {sizeIcon}
        </span>
      </div>
    </div>
  );
};

export default Index;
