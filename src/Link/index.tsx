import './style';
import React from 'react';
import { ConfigContext } from '@/ConfigProvider';
import classnames from 'classnames';
import Icon from '@/Icon';

interface Props {
  [key: string]: any;
}

export const Link: React.FC<Props> = ({ className, children, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('alink', props.prefixCls);
  return (
    <>
      <a className={classnames(`${prefixCls}`, className)} {...props}>
        {children}
        <Icon.Arrow className={`${prefixCls}-arrow`} fill="#666" />
      </a>
    </>
  );
};
