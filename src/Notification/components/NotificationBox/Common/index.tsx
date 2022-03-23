import React, { useState } from 'react';
import styles from './index.less';
import { LocalDateTime } from '@/Utils/interface';
import { Avatar, Typography, Modal } from 'antd';
import { Editor } from '@hocgin/ui';
import { NotificationOutlined } from '@ant-design/icons';
import { Format } from '@/index';

export { Chat } from './Chat';

export const Title: React.FC<{
  children?: any;
}> = ({ children }) => <div className={styles.header}>{children}</div>;

export const Dot: React.FC<{}> = () => <span className={styles.dot}>·</span>;

export const MessageSmallCard: React.FC<{ title: string, content: string, description?: string, datetime?: LocalDateTime }>
  = ({
       title,
       datetime,
       content,
       description,
     }) => {
  let [ellipsis, setEllipsis] = useState<boolean>(false);
  let fmtDatetime = Format.DateTime.useDefRelativeFromNow(datetime);
  return <div className={styles.messageSmallCard}>
    <Avatar size={34} icon={<NotificationOutlined />} />
    <div className={styles.body}>
      <div className={styles.title}><span>{title}</span>{fmtDatetime && (<>{fmtDatetime}</>)}</div>
      <div className={styles.content}>
        <Typography.Paragraph
          ellipsis={{
            rows: 2,
            expandable: false,
            suffix: ellipsis ? <a onClick={() => Modal.confirm({
              icon: null,
              cancelText: null,
              content: <><Editor editable={false} value={content} /></>,
            })}>查看</a> : null,
            onEllipsis: () => setEllipsis(true),
          } as any}>{description}</Typography.Paragraph>
      </div>
    </div>
  </div>;
};
