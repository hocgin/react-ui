export default class Lang {
  /**
   * /sd/sd/sd => ["/sd", "/sd/sd", "/sd/sd/sd"]
   * @param url
   * @return {string[]}
   */
  static urlToList(url: string) {
    const urllist = url.split('/').filter((i) => i);
    return urllist.map(
      (urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`,
    );
  }

  /**
   * 拆分数组
   * chunk([1,2,3,4,5], 2) => [[1,2], [3, 4], [5]]
   * @param array
   * @param length
   * @returns {Array}
   */
  static chunk(array: any[], length: number) {
    let index = 0;
    let newArray = [];

    while (index < array.length) {
      newArray.push(array.slice(index, (index += length)));
    }
    return newArray;
  }

  /**
   * 切割数据
   * - 情况1
   * slice([1,2,3,4], 2)
   * [1,2]
   * - 情况2
   * slice([1], 2)
   * [1]
   * @param array
   * @param max
   * @returns {*}
   */
  static slice(array: any[], max: number) {
    if (array.length < max) {
      max = array.length;
    }
    return array.slice(0, max);
  }

  /**
   * 去重
   * @param array
   * @return {*[]}
   */
  static distinct(array: any[] = []) {
    return Array.from(new Set(array));
  }

  /**
   * 删除指定位置
   * @param array
   * @param index
   */
  static delete(array: any[] = [], index: number) {
    array.splice(index, 1);
    return array;
  }

  /**
   * 调整默认值
   * @param o
   * @param def
   */
  static nullToDefault(o: any, def: any) {
    return Lang.isNull(o) ? def : o;
  }

  /**
   * 是否为null
   * @param o
   */
  static isNull(o: any) {
    return o === null || o === undefined;
  }

  /**
   * 是否非null
   * @param o
   */
  static isNotNull(o: any) {
    return !Lang.isNull(o);
  }

  /**
   * 转为数值
   * @param val
   */
  static toNumber(val?: any) {
    if (Lang.isNull(val)) {
      return val;
    }
    if (typeof val === 'string') {
      val.replaceAll(' ', '');
      if (val.includes(',')) {
        return val.replaceAll(',', '');
      }
      return val;
    }
    return val;
  }

  /**
   * 是否图片的url
   * @param url
   */
  static isImgUrl(url?: string) {
    return (
      `${url}`.endsWith('.png') ||
      `${url}`.endsWith('.jpeg') ||
      `${url}`.endsWith('.svg')
    );
  }

  /**
   * 补充协议
   * @param url
   */
  static suppleUrlPrefix(url?: string) {
    if (Lang.nullToDefault(url, '').trim() === '') {
      return null;
    }
    if (url?.startsWith('http://') || url?.startsWith('https://')) {
      return url;
    }
    return `http://${url}`;
  }

  /**
   * 获取图片后缀
   * @param url
   */
  static getSuffix(url?: string) {
    let suffix = `${url}`;
    if (suffix.includes('.')) {
      let lastIndex = suffix.lastIndexOf('.');
      suffix = suffix.substr(lastIndex + 1);
    }
    if (suffix.length > 4) {
      suffix = 'N/A';
    }
    return suffix.toUpperCase();
  }

  /**
   * await sleep(5000)
   * @param time
   */
  static sleep(time: number = 3 * 1000) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), time);
    });
  }

  /**
   * 是否是浏览器端渲染
   */
  static isBrowser() {
    return typeof window !== 'undefined';
  }

  /**
   * 是否后端渲染
   */
  static isServer() {
    return typeof window === 'undefined';
  }

  static tryRequire(path: string) {
    try {
      return require(path);
    } catch (e) {
      console.warn(`require(${path}) try error`, e);
      return null;
    }
  }
}
