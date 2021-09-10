import { Ui } from '@/Utils/ui';

const ConfigKeys = {
  // hook 响应处理
  hookResponse: 'hookResponse',
  // sso 服务地址
  ssoServerUrl: 'ssoServerUrl',
  // api 服务地址
  baseServerUrl: 'baseServerUrl',
  // 请求头部
  header: 'header',
};

export class Config {
  static ConfigKeys = ConfigKeys;
  // 默认配置
  static defaultConfig: { [key: string]: any } = {
    [ConfigKeys.ssoServerUrl]: `${Ui.getDomain()}/login`,
    [ConfigKeys.baseServerUrl]: `${Ui.getDomain()}/api`,
    [ConfigKeys.header]: {},
    [ConfigKeys.hookResponse]: (response: any) => {
      if (response.status === 401) {
        response.json().then(({ redirectUrl }: any) => {
          window.location.href = `${Config.get(
            ConfigKeys.ssoServerUrl,
          )}?redirectUrl=${redirectUrl ?? window.location.href}`;
        });
      }
    },
  };
  // 自定义配置
  static customConfig: { [key: string]: any } = {};

  /**
   * 设置配置
   * @param key
   * @param value
   */
  static set(key: string, value: any) {
    this.customConfig[key] = value;
  }

  /**
   * 获取配置
   * @param key
   */
  static get(key: string) {
    return Config.getConfigs()[key];
  }

  /**
   * 当前配置
   * @returns {Config.defaultConfig}
   */
  static getConfigs() {
    return {
      ...Config.defaultConfig,
      ...Config.customConfig,
    };
  }

  /**
   * 获取接口地址
   */
  static getBaseServerUrl() {
    return Config.get(Config.ConfigKeys.baseServerUrl);
  }

  /**
   * 设置接口地址
   * @param url
   */
  static setBaseServerUrl(url: string) {
    Config.set(Config.ConfigKeys.baseServerUrl, url);
  }

  /**
   * 请求头部信息
   */
  static getHeaders() {
    return {
      ...Config.get(Config.ConfigKeys.header),
    };
  }

  /**
   * 请求头部信息
   */
  static setHeaders(header: any) {
    Config.set(Config.ConfigKeys.header, header || {});
  }
}
