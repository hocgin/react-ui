import React, { useState } from 'react';
import classnames from 'classnames';
import styles from './index.less';
// @ts-ignore
import Truncate from 'react-truncate';
import { useInterval } from 'ahooks';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
  CopyOutlined,
  CheckOutlined,
} from '@ant-design/icons';

const Index: React.FC<{
  className?: string;
  children?: any;
  maxRow?: number;
  fullSize?: boolean;
  bordered?: boolean;
}> = ({ children, fullSize = false, className, maxRow, bordered = false, ...rest }) => {
  let [fsize, setFullSize] = useState(fullSize);
  let [copied, setCopied] = useState(false);

  let sizeIcon = fsize ? <FullscreenExitOutlined /> : <FullscreenOutlined />;

  let onCopy = () => {
    if (!copied) {
      setCopied(true);
    }
  };
  useInterval(() => setCopied?.(false), 2000);

  return (
    <div
      className={classnames(styles.stretch, className, {
        [styles.bordered]: bordered,
      })}
    >
      <div className={styles.content}>
        <Truncate lines={!fsize && maxRow} ellipsis={'...'}>{children}</Truncate>
      </div>
      <div className={styles.toolbar}>
        <span className={styles.copy}>
          {copied ? (
            <CheckOutlined style={{ color: '#00B06D' } as any} />
          ) : (
            <CopyToClipboard text={`${children}`} onCopy={onCopy}>
              <CopyOutlined />
            </CopyToClipboard>
          )}
        </span>
        <span onClick={() => setFullSize(!fsize)} className={styles.resize}>
          {sizeIcon}
        </span>
      </div>
    </div>
  );
};

export default Index;
