import React, { useState } from 'react';
import classnames from 'classnames';
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
import { ConfigContext } from '@/config-provider';
import './index.less';

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  children?: any;
  maxRow?: number;
  fullSize?: boolean;
  bordered?: boolean;
}> = ({
  children,
  fullSize = false,
  className,
  maxRow,
  bordered = false,
  ...props
}) => {
  let [fsize, setFullSize] = useState(fullSize);
  let [copied, setCopied] = useState(false);

  let sizeIcon = fsize ? <FullscreenExitOutlined /> : <FullscreenOutlined />;

  let onCopy = () => {
    if (!copied) {
      setCopied(true);
    }
  };
  useInterval(() => setCopied?.(false), 2000);

  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('stretch', props.prefixCls);

  return (
    <div
      className={classnames(prefixCls, className, {
        [`${prefixCls}-bordered`]: bordered,
      })}
    >
      <div className={'content'}>
        <Truncate lines={!fsize && maxRow} ellipsis={'...'}>
          {children}
        </Truncate>
      </div>
      <div className={'toolbar'}>
        <span className={'copy'}>
          {copied ? (
            <CheckOutlined style={{ color: '#00B06D' } as any} />
          ) : (
            <CopyToClipboard text={`${children}`} onCopy={onCopy}>
              <CopyOutlined />
            </CopyToClipboard>
          )}
        </span>
        <span onClick={() => setFullSize(!fsize)} className={'resize'}>
          {sizeIcon}
        </span>
      </div>
    </div>
  );
};

export default Index;
