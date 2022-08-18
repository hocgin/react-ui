import React from 'react';
import classnames from 'classnames';
import {Icon} from "@/index";

import {ConfigContext} from '@/ConfigProvider';

export const HeartFilled: React.FC<{
  prefixCls?: string;
  className?: any;
  style?: any;
  href?: string;
}> = ({className, style, href = 'https://www.hocgin.top', ...props}) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('logo-heart', props.prefixCls);
  return (
    <a
      className={classnames(`${prefixCls}`, className)}
      href={href}
      target="_blank"
    >
      <div className={classnames(`${prefixCls}-heart`)} style={style}>
        <Icon.HeartFilled />
      </div>
    </a>
  );
};

const Index: React.FC<{
  prefixCls?: string;
  href?: string;
  text?: boolean;
}> = ({href = 'https://hocg.in', text = 'HOCGIN', ...props}) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('logo', props.prefixCls);
  return (
    <div className={`${prefixCls}`}>
      <HeartFilled href="https://uptime.hocgin.top/status/ping" />{' '}
      <a
        className={`${prefixCls}-text`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    </div>
  );
};

export default Index;
