import React from 'react';
import useRequest, { Action } from '@/Utils/net/request';

export interface RequestProps {
  action: Action;
  params?: any;
  manual?: boolean;
}

const Request: React.FC<RequestProps> = (
  { params = {}, action, manual = false },
  ref,
) => {
  let { data, loading, values, setValues, reload } = useRequest(action, {
    manual,
    params,
  });
  const onClickReload = () => reload();
  const onClickAdd = () => setValues({ t: Math.random() });

  return (
    <div>
      {loading ? '加载中' : `${JSON.stringify(data)}`}
      <button onClick={onClickReload}>reload</button>
      <button onClick={onClickAdd}>add</button>
    </div>
  );
};

export default Request;
