import {request as requestFun} from '@hocgin/hkit';

export let request = requestFun;

export function useGet(url: string, options?: any): Promise<any> {
  return request?.(url, {method: 'GET', ...options});
}

export function usePost(url: string, options?: any): Promise<any> {
  return request?.(url, {method: 'POST', data: {}, ...options});
}

export function usePut(url: string, options?: any): Promise<any> {
  return request?.(url, {method: 'PUT', data: {}, ...options});
}

export function useDelete(url: string, options?: any): Promise<any> {
  return request?.(url, {method: 'DELETE', data: {}, ...options});
}
