import React from 'react';
import {ConfigContext} from '@/ConfigProvider';
import classnames from 'classnames';
import { Avatar} from 'antd';

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  src?: string;
  size?: number;
  icon?: any;
  isCommenter?: boolean;
  isInitiator?: boolean;
}> = ({ isCommenter = false, isInitiator = false, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('comment-avatar', props.prefixCls);
  return (
    <div className={classnames(`${prefixCls}`, props.className)}>
      <Avatar src={props?.src} size={props.size} icon={props.icon} />
      <div className={`${prefixCls}-badge`}>
        {isCommenter ? <div className={`${prefixCls}-commenter`}>我</div> : null}
        {isInitiator ? <div className={`${prefixCls}-initiator`}>发</div> : null}
      </div>
    </div>
  );
};

export default Index;
