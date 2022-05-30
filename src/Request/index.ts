let umiRequest: any;
try {
  const { request } = require('@umijs/plugin-request/src/request');
  umiRequest = request;
} catch (e) {
  umiRequest = null;
  console.warn('Please install @umijs/plugin-request');
}

let requestFun: any;
if (umiRequest) {
  let defaultOptions: any = {
    debounceWait: 300,
    retryCount: 3,
  };

  const extendRequest = (url: string, options: any) => {
    return umiRequest(url, { ...defaultOptions, ...options }).catch(
      console.debug,
    );
  };

  requestFun = function request(url: string, options?: any): Promise<any> {
    return extendRequest(url, options);
  };
}

export let request = requestFun;

export function useGet(url: string, options?: any): Promise<any> {
  return request?.(url, { method: 'GET', ...options });
}

export function usePost(url: string, options?: any): Promise<any> {
  return request?.(url, { method: 'POST', data: {}, ...options });
}

export function usePut(url: string, options?: any): Promise<any> {
  return request?.(url, { method: 'PUT', data: {}, ...options });
}

export function useDelete(url: string, options?: any): Promise<any> {
  return request?.(url, { method: 'DELETE', data: {}, ...options });
}