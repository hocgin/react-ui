import React, { useState } from 'react';
import useRequest, { Action } from '@/Utils/useRequest';

export interface RequestProps {
  action: Action<string, any, any>;
  params?: any;
  manual?: boolean;
}

const Request: React.FC<RequestProps> = (
  { params = {}, action, manual = false },
  ref,
) => {
  let [values, setValues] = useState(params);
  let options = {
    manual: false,
    params: values,
    onError: console.error,
    onSuccess: console.log,
  };
  let request = {
    default: () => useRequest('default', action, options),
    test: () => useRequest('test', action, options),
  };
  let { data, loading, refresh, runAsync, run } = request['default']();
  const onClickReload = () => run(values);
  const onClickAdd = () => setValues({ t: Math.random() });
  let testUseRequest = request['test']();

  return (
    <div>
      {loading ? '加载中' : `${JSON.stringify(data)}`}
      <button onClick={onClickReload}>reload</button>
      <button onClick={onClickAdd}>add</button>
      <button onClick={() => testUseRequest.runAsync(values)}>
        click type test
      </button>
    </div>
  );
};

export default Request;
