import React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '@/ConfigProvider';

const Index: React.FC<{
  title?: string;
  children?: any;
  bordered?: boolean;
}> = ({ title, children, bordered }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('text-row');

  return (
    <div
      className={classnames(`${prefixCls}`, {
        [`${prefixCls}-border-top`]: bordered,
      })}
    >
      <span className={`${prefixCls}-title`}>{title}</span>
      <span className={`${prefixCls}-text`}>{children}</span>
    </div>
  );
};

export default Index;
