import { request as requestFun } from '@hocgin/hkit';

/**
 * @deprecated
 * @param url
 * @param options
 */
export let request = requestFun;

/**
 * @deprecated
 * @param url
 * @param options
 */
export function useGet(url: string, options?: any): Promise<any> {
  return request?.(url, { method: 'GET', ...options });
}

/**
 * @deprecated
 * @param url
 * @param options
 */
export function usePost(url: string, options?: any): Promise<any> {
  return request?.(url, { method: 'POST', data: {}, ...options });
}

/**
 * @deprecated
 * @param url
 * @param options
 */
export function usePut(url: string, options?: any): Promise<any> {
  return request?.(url, { method: 'PUT', data: {}, ...options });
}

/**
 * @deprecated
 * @param url
 * @param options
 */
export function useDelete(url: string, options?: any): Promise<any> {
  return request?.(url, { method: 'DELETE', data: {}, ...options });
}
