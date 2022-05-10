import React from 'react';
import { Badge, Tooltip } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { ConfigContext } from '@/ConfigProvider';

export const NotificationIndicator: React.FC<{
  prefixCls?: string;
  className?: string;
  count?: number;
  onClick?: () => void;
}> = ({ count, onClick, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('notification-indicator', props.prefixCls);
  let visible = !count;
  return (
    <div className={`${prefixCls}`} onClick={onClick}>
      <Tooltip title={visible ? '有未读的消息' : null}>
        {/*@ts-ignore*/}
        <Badge dot={visible} size="small">
          <BellOutlined style={{ fontSize: 16 } as any} />
        </Badge>
      </Tooltip>
    </div>
  );
};
