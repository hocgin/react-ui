import React from 'react';
import { NodeExpandOutlined } from '@ant-design/icons';
import { Button, Modal, List } from 'antd';
import { ID } from '@/_types';
import { CommentType, HistoryType, HistoryParamsType, UseAction } from '@/Comment/components/type';
import { useRequest } from 'ahooks';
import Comment from '../Comment/index';
import { LangKit } from '@/_utils';

export const ExpandHistoryButton: React.FC<{
  id: ID;
  useAction: UseAction;
}> = ({ useAction, id }) => {
  let [modal, contextHolder] = Modal.useModal();
  let { loading, runAsync } = useRequest<HistoryType, [HistoryParamsType]>(
    LangKit.nilService(useAction.history, []),
    {
      manual: true,
      onSuccess: (data: HistoryType) => {
        modal.confirm({
          bodyStyle: {
            padding: '16px 16px 12px',
          },
          icon: null,
          width: '90%',
          title: '回溯评论',
          content: (
            <>
              <List dataSource={data || []}
                    renderItem={(item: CommentType, index) => <List.Item key={index}>
                      <Comment
                        hasUserOptions={false}
                        hasHistory={false}
                        hasLoadChild={false}
                        initialLoad={false}
                        comment={item}
                        useAction={useAction}
                      />
                    </List.Item>}
              />
            </>
          ),
        });
      },
    },
  );

  return <>
    {contextHolder}
    <Button
      loading={loading}
      size={'small'}
      onClick={() => runAsync({ commentId: id })}
      type='link'
      icon={<NodeExpandOutlined />}
    />
  </>;
};
