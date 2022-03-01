import * as React from 'react';
import { Button, Tooltip } from 'antd';
import styles from './index.less';
import classnames from 'classnames';

const Index: React.FC<{
  className?: string;
  onClick?: () => void;
  children?: any;
  title?: string;
  disabled?: boolean;
}> = ({ className, disabled = false, title, children, onClick }) => {
  return (
    <div className={classnames(styles.btn, className)}>
      <Tooltip placement="bottom" title={title}>
        <Button type="text" onClick={onClick} disabled={disabled}>
          <div onTouchStart={(e) => e.preventDefault()}>{children}</div>
        </Button>
      </Tooltip>
    </div>
  );
};

export default Index;
