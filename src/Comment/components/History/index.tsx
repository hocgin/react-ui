import React from 'react';
import { NodeExpandOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { ID } from '@/Utils/interface';

export const ExpandHistoryButton: React.FC<{ id: ID }> = ({ id }) => {
  return (
    <Button
      size={'small'}
      ghost
      onClick={() =>
        Modal.confirm({
          icon: null,
          content: <>回复路径,设计中.. {id}</>,
        })
      }
      type="link"
      icon={<NodeExpandOutlined />}
    />
  );
};
