export default class Config {
  // 默认配置
  static defaultConfig: { [key: string]: any } = {};
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
   * 当前配置
   * @returns {Config.defaultConfig}
   */
  static getConfigs() {
    return {
      ...Config.defaultConfig,
      ...Config.customConfig,
    };
  }
};
