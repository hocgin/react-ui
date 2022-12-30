import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import { LangKit } from '@/_utils';
import { UIKit } from '@/_utils';
import { UseAction } from './type';
import { useMount, useRequest } from 'ahooks';
import { TreeNode } from '@/_types';

const Index: React.FC<{
  /**
   * 请求
   */
  useAction: UseAction;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 选择提示
   */
  placeholder?: string;
}> = ({ multiple = true, placeholder = '请选择..', useAction, ...rest }) => {
  let [data, setData] = useState<TreeNode[]>([]);

  let service = LangKit.nilService(useAction?.initialValues, []);
  let { run, loading } = useRequest(service, {
    manual: true,
    onSuccess: (data: TreeNode[]) => setData(data),
  });

  useMount(() => run());

  return (
    <TreeSelect
      loading={loading}
      allowClear
      treeCheckable={multiple}
      multiple={multiple}
      placeholder={placeholder}
      {...rest}
    >
      {UIKit.renderTreeSelectNodes(data)}
    </TreeSelect>
  );
};

export default Index;
