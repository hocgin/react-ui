import React from 'react';
import useRequest, { RequestData } from '@/Utils/net/use-request';
import * as stream from 'stream';

export interface RequestProps {
  /**
   * 设置样式名
   */
  className?: string;
  initialValues?: any;
  params?: any;
  request?: (
    values: Record<string, any>,
    props: RequestProps,
  ) => Promise<RequestData>;
  uiKey?: string;
}

const Request: React.FC<RequestProps> = (props, ref) => {
  let { data, loading, values, setValues, reload } = useRequest({
    request: props.request,
  });
  console.log('values', values);

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

// demo
interface Props {
  action:
    | string
    | ((
        type: 'update' | 'add',
        data: Record<string, any>,
        sysAttach: Record<string, any>,
        userAttach: Record<string, any>,
      ) => Promise<RequestData>);
}
