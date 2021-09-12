import { RequestConfig, ErrorShowType } from '@@/plugin-request/request';
import { RequestOptionsInit } from 'umi-request';
import { Config } from '@/Utils/config';
import { message } from 'antd';
import moment from 'moment';

moment.locale('zh-cn');

// => 正常
// => 分页数据
// => 下拉数据
export const request: RequestConfig = {
  timeout: 5 * 1000,
  errorConfig: {
    adaptor: (preData) => {
      let result: any = {
        showType: ErrorShowType.ERROR_MESSAGE,
      };

      try {
        result = {
          ...result,
          errorMessage: preData?.message,
          ...preData,
        };
      } catch (e) {
        result = {
          ...result,
          success: false,
          errorMessage: '响应数据格式解析错误',
        };
      }
      return result;
    },
  },
  middlewares: [
    async (ctx, next) => {
      await next();
    },
  ],
  requestInterceptors: [
    // 默认请求头
    (url: string, options: RequestOptionsInit) => {
      console.debug('[请求拦截器]::', '附带请求头');
      const defaultOptions = {
        credentials: 'include',
      };
      const newOptions = {
        ...defaultOptions,
        ...options,
      } as RequestOptionsInit;
      newOptions.headers = {
        'X-Page-Url': window.location.href,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
        Origin: url,
        ...newOptions.headers,
      };

      return { url, options: newOptions };
    },
  ],
  responseInterceptors: [
    (response: Response, options: RequestOptionsInit) => {
      return response;
    },
    // 认证检查
    async (response: Response, options: RequestOptionsInit) => {
      console.debug('[响应拦截器]::', '认证检查');
      if (response.status === 401) {
        response.json().then(({ redirectUrl }: any) => {
          window.location.href = `${Config.getSsoServerUrl()}/login?redirectUrl=${
            redirectUrl ?? window.location.href
          }`;
        });
      }
      return response;
    },
    async (response: Response, options: RequestOptionsInit) => {
      try {
        await response.clone().json();
      } catch (e) {
        message.error('响应数据格式解析错误');
      }
      return response;
    },
  ],
};
