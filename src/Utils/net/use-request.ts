import React, { useState, useEffect } from 'react';
import { HttpResult } from '@/Utils/interface';

/**
 * 响应结构
 */
export type RequestData<T = any> = HttpResult<T>;

/**
 * 返回的操作和数据
 */
export type UseRequestAction<T extends RequestData> = {
  // 返回的数据
  data: T['data'] | T,
  // 加载状态
  loading: boolean | undefined;
  // 设置参数
  setValues: (values: any) => void;
  values: any;
  // 重新加载
  reload: () => Promise<void>;
};

/**
 * T 响应数据
 * U 请求参数
 * @param props
 */
function useRequest<T extends RequestData, U extends Record<string, any> = Record<string, any>>(props: {
  key?: React.Key;
  params?: U;
  initialValues?: T,
  request?: (params: U, props: any) => Promise<T> | any;
  onRequestError?: (e: Error) => void;
  manual?: boolean;
}): UseRequestAction<T> {
  const { manual, initialValues } = props || {};
  const [loading, setLoading] = useState<boolean>();
  const [entity, setEntity] = useState(initialValues);
  const [values, setValues] = useState<any>({});

  // 更新数据
  const updateDataAndLoading = (data: T) => {
    setEntity(data);
    setLoading(false);
  };

  // 发起请求
  const requestData = async () => {
    setLoading(true);
    try {
      const { data, success } = (await props.request?.({ ...props.params as U, ...values }, props) || {});
      if (success !== false) {
        updateDataAndLoading(data);
      }
    } catch (e) {
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (props?.onRequestError === undefined) {
        throw new Error(e as string);
      } else {
        props?.onRequestError(e as Error);
      }
      setLoading(false);
    }
  };

  // 挂载请求
  useEffect(() => {
    if (manual) {
      return;
    }
    requestData();
  }, [manual]);

  return {
    data: entity,
    loading: loading,
    values: values,
    setValues: setValues,
    reload: () => requestData(),
  };
}

/**
 * 这是一个专用扩展请求
 */
export default useRequest;
