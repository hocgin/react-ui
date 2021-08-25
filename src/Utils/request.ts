import hash from 'hash.js';

export default function Request(url: string, options?: any) {
  const defaultOptions = {
    credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  newOptions.headers = {
    'X-Page-Url': window.location.href,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json; charset=UTF-8',
    'Origin': url,
    ...newOptions.headers,
  };

  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {

    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };

      newOptions.headers['X-Page-Url'] = window.location.href;
      newOptions.headers['X-Requested-With'] = 'XMLHttpRequest';
      newOptions.headers['Content-Type'] = 'application/json; charset=UTF-8';
      newOptions.headers['Origin'] = url;
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: 'application/json',
        ...newOptions.headers,
      };
    }
  }

  // 请求缓存
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : '');
  const hashcode = hash.sha256().update(fingerprint).digest('hex');
  const expirys = options.expirys && 60;
  if (options.expirys !== false) {
    const cached = sessionStorage.getItem(hashcode);
    const whenCached = sessionStorage.getItem(`${hashcode}:timestamp`);
    if (cached !== null && whenCached !== null) {
      const age = (Date.now() - parseInt(whenCached)) / 1000;
      if (age < expirys) {
        const response = new Response(new Blob([cached]));
        return response.json();
      }
      sessionStorage.removeItem(hashcode);
      sessionStorage.removeItem(`${hashcode}:timestamp`);
    }
  }

  return fetch(url, newOptions)
    .then(response => cachedSave(response, hashcode))
    // 响应状态检查
    .then((response) => {

      if (response.status === 401) {
        response.json().then(({ redirectUrl }: any) => {
          window.location.href = `${options?.ssoServerUrl()}?redirectUrl=${redirectUrl ?? window.location.href}`;
        });
      }

      if (response.status >= 200 && response.status <= 500) {
        return response;
      }

      const error: any = new Error(response.statusText);
      error.response = response;
      throw error;
    })
    // 响应结果转JSON
    .then(response => {
      return response.json();
    })
    // 异常响应处理
    .catch((e) => {
      console.log('[请求出现异常]', e);
    });
};

/**
 * 结果缓存
 * @param response
 * @param hashcode
 * @returns {*}
 */
const cachedSave = (response: any, hashcode: any) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get('Content-Type');
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response.clone().text().then((content: any) => {
      sessionStorage.setItem(`${hashcode}`, `${content}`);
      sessionStorage.setItem(`${hashcode}:timestamp`, `${Date.now()}`);
    });
  }
  return response;
};
