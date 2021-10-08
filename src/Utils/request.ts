import { request as umiRequest } from '@umijs/plugin-request/src/request';

const extendRequest = (url: any, options: any) => {
  return umiRequest(url, options).catch(console.debug);
};

interface RequestType {
  (url: string, options: any): Promise<any>;

  get: (url: any, options?: any) => Promise<any>;
  post: (url: any, options?: any) => Promise<any>;
  put: (url: any, options?: any) => Promise<any>;
  delete: (url: any, options?: any) => Promise<any>;
}

const request: RequestType = (url: any, options: any): Promise<any> => {
  return extendRequest(url, options);
};

request.get = (url: any, options?: any): Promise<any> => {
  return extendRequest(url, { method: 'GET', ...options });
};

request.post = (url: any, options?: any): Promise<any> => {
  return extendRequest(url, { method: 'POST', data: {}, ...options });
};

request.put = (url: any, options?: any): Promise<any> => {
  return extendRequest(url, { method: 'PUT', data: {}, ...options });
};

request.delete = (url: any, options?: any): Promise<any> => {
  return extendRequest(url, { method: 'DELETE', data: {}, ...options });
};
export default request;
