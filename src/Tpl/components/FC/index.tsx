import React, { useState, useMemo, useRef } from 'react';
import { useRequest } from '@hocgin/ui';
import { Action } from '@/Utils/useRequest';

export interface RequestProps {
  /**
   * 设置样式名
   */
  className?: string;
  defaultParams?: any;
  action: Action<'default', any, any>;
}

const Request: React.FC<RequestProps> = (props, ref) => {
  let { action, defaultParams } = props;
  let request = {
    default: () => useRequest('default', action, { defaultParams }),
  };

  let { data, loading, refresh, runAsync } = request['default']?.();

  const onClickReload = () => refresh();
  const onClickAdd = () => runAsync({ ...defaultParams, t: Math.random() });
  return (
    <div>
      {loading ? '加载中' : `${JSON.stringify(data)}`}
      <button onClick={onClickReload}>reload</button>
      <button onClick={onClickAdd}>add</button>
    </div>
  );
};

export default Request;
