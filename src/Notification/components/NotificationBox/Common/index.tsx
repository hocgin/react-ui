import React from 'react';

import { LocalDateTime } from '@/_types';
import { Avatar, Modal } from 'antd';
import Editor from '@/Editor';
import { NotificationOutlined } from '@ant-design/icons';
import { ConfigContext } from '@/ConfigProvider';
import { FormatKit } from '@/_utils';

export { Chat } from './Chat';

export const Title: React.FC<{
  children?: any;
  className?: string;
  prefixCls?: string;
}> = ({ children, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('notification--Common-Title', props.prefixCls);
  return <div className={prefixCls}>{children}</div>;
};

export const Dot: React.FC<{
  className?: string;
  prefixCls?: string;
}> = ({ ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('notification--Common-Dot', props.prefixCls);
  return <span className={prefixCls}>·</span>;
};

export const MessageSmallCard: React.FC<{
  title: string;
  content: string;
  description?: string;
  datetime?: LocalDateTime;
  prefixCls?: string;
}> = ({ title, datetime, content, description, ...props }) => {
  let fmtDatetime = FormatKit.parseLocalDatetime(datetime);
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls(
    'notification--Common-MessageSmallCard',
    props.prefixCls,
  );
  return (
    <div className={prefixCls}>
      <Avatar size={34} icon={<NotificationOutlined />} />
      <div className={'body'}>
        <div className={'title'}>
          <span>{title}</span>
          {fmtDatetime && <>{fmtDatetime}</>}
        </div>
        <div className={'container'}>
          <div className={'content'}>{description}</div>
          <div className={'more'}>
            {content && (
              <a
                rel='noopener noreferrer'
                onClick={() =>
                  Modal.confirm({
                    icon: null,
                    cancelText: null,
                    content: <Editor editable={false} value={content} />,
                  })
                }
              >
                更多
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
