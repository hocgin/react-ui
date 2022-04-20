import React from 'react';
import classnames from 'classnames';
import { ConfigContext } from '@/ConfigProvider';

const Index: React.FC<{
  prefixCls?: string;
  /**
   * 设置样式名
   */
  className?: string;
  /**
   * 内容
   */
  children?: string | Node;
  /**
   * 编程语言
   */
  lang?: string;
  /**
   * 边框
   */
  bordered?: boolean;
}> = (props, ref) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('code', props.prefixCls);
  let { className, children, bordered = true } = props;
  return (
    <div
      className={classnames(prefixCls, className, {
        [`${prefixCls}-bordered`]: bordered,
      })}
    >
      <code>{children}</code>
    </div>
  );
};

export default Index;
