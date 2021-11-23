import { HttpResult } from '@/Utils/interface';
import { useEffect, useState } from 'react';
import { request as umiRequest } from '@umijs/plugin-request/src/request';

/**
 * 请求数据
 */
type RequestData = Record<string, any>;

/**
 * URL 信息
 */
interface UrlRecord extends Record<string, any> {
  url: string;
  method?: string;
  data?: any;
}

/**
 * 请求的函数
 * T: 支持的请求类型
 * P: 构建请求的数据
 * R: 返回的数据类型
 */
type RequestAction<T = string, P = any, R = any> = (
  type: T,
  data: P,
) => Promise<R>;

/**
 * 请求的URL
 * T: 支持的请求类型
 * P: 构建请求的数据
 * R: 返回的数据类型
 */
type UrlAction<T = string, P = any, R = UrlRecord> = (type: T, data: P) => R;

export type Action<T = string, P = RequestData, R = any> =
  | UrlAction<T, P>
  | RequestAction<T, P, R>;

/**
 * 响应结构
 */
export type ResponseData<T = any> = HttpResult<T>;

/**
 * 请求包装器#操作和数据
 */
export type UseRequestAction<R extends ResponseData> = {
  // 返回的数据
  data: R['data'] | R;
  // 加载状态
  loading: boolean | undefined;
  // 设置参数
  setValues: (values: any) => void;
  // 提交的数据
  values: any;
  // 重新加载
  reload: () => Promise<void>;
};

/**
 * 请求包装器#参数
 * T: 支持的请求类型
 * P: 构建请求的数据
 * R: 返回的数据类型
 */
interface UseRequestProps<T = string, P = any, R = any> {
  // 默认值
  initialValues?: R;
  // 请求类型
  type?: T;
  // 请求参数
  params?: P;
  // 请求错误处理
  onRequestError?: (e: Error) => void;
  // 手动模式
  manual?: boolean;
}

/**
 * 请求包装器
 * R: 返回的数据类型
 * @param props
 */
function useRequest<T = string, P = any, R extends ResponseData = any>(
  service: Action,
  props: UseRequestProps<string, Record<string, any>, R>,
): UseRequestAction<R> {
  let {
    manual = false,
    initialValues = {},
    params = {},
    type = 'default',
    onRequestError = console.error,
  } = props || {};
  const [loading, setLoading] = useState<boolean>();
  const [entity, setEntity] = useState(initialValues);
  const [values, setValues] = useState<any>({});

  // UrlAction -> RequestAction
  let request: RequestAction = asAsyncRequest(
    type,
    { ...params, ...values } as RequestData,
    service,
  );

  // 更新数据
  const updateDataAndLoading = (data: R) => {
    setEntity(data);
    setLoading(false);
  };

  // 发起请求
  const requestData = async () => {
    try {
      setLoading(true);
      const { data, success } =
        (await request?.(type, { ...params, ...values })) || {};
      if (success !== false) {
        updateDataAndLoading(data);
      }
    } catch (e) {
      // 如果没有传递这个方法的话，需要把错误抛出去，以免吞掉错误
      if (onRequestError === undefined) {
        throw new Error(e as string);
      } else {
        onRequestError(e as Error);
      }
    } finally {
      setLoading(false);
    }
  };

  // 挂载请求
  useEffect(() => {
    // 如果是手动模式，则不执行请求
    if (manual) {
      return;
    }
    requestData();
  }, [manual]);

  return {
    loading,
    data: entity,
    setValues,
    values,
    reload: requestData,
  };
}

/**
 * 这是一个专用扩展请求
 */
export default useRequest;

export function asAsyncRequest(
  type: string,
  pData: any,
  action: Action,
): RequestAction {
  if (isUrlAction(action)) {
    let { url, method } = (action as UrlAction)(type, pData);
    let isGet = 'GET' === `${method}`.toUpperCase();
    return async (type: string, data: any) => {
      if (isGet) {
        data = null;
      }
      return {
        ...(await umiRequest(url, {
          method,
          data,
        })),
      };
    };
  }
  return action as RequestAction;
}

function isUrlAction(fn: Function) {
  let funBody = fn.toString();
  let reg = /return\s{/g;
  return reg.test(funBody);
}
