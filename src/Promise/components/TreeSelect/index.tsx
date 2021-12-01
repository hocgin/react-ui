import React, { useState } from 'react';
import { TreeSelect } from 'antd';
import { Utils, Dom } from '@hocgin/ui';
import { UseAction } from './type';
import { useMount, useRequest } from 'ahooks';
import { TreeNode } from '@/Utils/interface';

interface TreeSelectProps {
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
}

const Index: React.FC<TreeSelectProps> = ({
                                            multiple = true,
                                            placeholder = '请选择',
                                            useAction,
                                            ...rest
                                          }) => {

  let [data, setData] = useState<TreeNode[]>([]);
  let { run, loading } = useRequest(useAction.initialValues, {
    manual: true,
    onSuccess: (data: TreeNode[]) => setData(data),
  });

  useMount(() => run());

  return (
    <TreeSelect loading={loading}
                allowClear
                treeCheckable={multiple}
                multiple={multiple}
                placeholder={placeholder}
                {...rest}
    >
      {Dom.renderTreeSelectNodes(data)}
    </TreeSelect>
  );
};

export default Index;
