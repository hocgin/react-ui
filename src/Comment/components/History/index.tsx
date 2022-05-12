import React from 'react';
import { NodeExpandOutlined } from '@ant-design/icons';
import { Button, Modal, List } from 'antd';
import { ID } from '@/Utils/interface';
import { CommentType, HistoryType, UseAction } from '@/Comment/components/type';
import { useRequest } from 'ahooks';
import Comment, { Content } from '../Comment/index';
import Utils from '@/Utils';
import Loading from '@/Loading';

export const ExpandHistoryButton: React.FC<{
  id: ID;
  useAction: UseAction;
}> = ({ useAction, id }) => {
  let { loading, runAsync } = useRequest(
    Utils.Lang.nilService(useAction.history, []),
    {
      manual: true,
      onSuccess: (data: HistoryType) => {
        Modal.confirm({
          icon: null,
          width: '90%',
          title: '回溯评论',
          content: (
            <>
              <List
                loading={loading}
                dataSource={data || []}
                renderItem={(item: CommentType, index) => (
                  <List.Item key={index}>
                    <Comment
                      hasUserOptions={false}
                      hasHistory={false}
                      hasLoadChild={false}
                      initialLoad={false}
                      comment={item}
                      useAction={useAction}
                    />
                  </List.Item>
                )}
              />
            </>
          ),
        });
      },
    },
  );

  return (
    <Button
      loading={loading}
      size={'small'}
      onClick={() => runAsync({ id })}
      type="link"
      icon={<NodeExpandOutlined />}
    />
  );
};
