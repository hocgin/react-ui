import { LangKit as _LangKit } from '@hocgin/hkit';
import { HtmlTagType } from './types';

export default class LangKit extends _LangKit {
  /**
   * 转 long
   * @param val
   */
  public static asLong(val: undefined | null | number | string) {
    if (val === undefined || val === null) {
      return null;
    } else if (typeof val === 'string') {
      return parseInt(val);
    } else {
      return val;
    }
  }

  /**
   * /sd/sd/sd => ["/sd", "/sd/sd", "/sd/sd/sd"]
   * @param url
   * @return {string[]}
   */
  public static urlToList(url: string) {
    const urllist = url.split('/').filter((i) => i);
    return urllist.map(
      (urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`,
    );
  }

  /**
   * 调整默认值
   * @param o
   * @param def
   */
  public static nullToDefault(o: any, def: any) {
    return LangKit.isNull(o) ? def : o;
  }

  /**
   * 是否为null
   * @param o
   */
  public static isNull(o: any) {
    return o === null || o === undefined;
  }

  /**
   * 是否非null
   * @param o
   */
  public static isNotNull(o: any) {
    return !LangKit.isNull(o);
  }

  /**
   * 转为数值
   * @param val
   */
  public static toNumber(val?: any) {
    if (LangKit.isNull(val)) {
      return val;
    }
    if (typeof val === 'string') {
      val.replace(/ /g, '');
      if (val.includes(',')) {
        return val.replace(/,/g, '');
      }
      return val;
    }
    return val;
  }

  /**
   * 是否图片的url
   * @param url
   */
  public static isImgUrl(url?: string) {
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
  public static suppleUrlPrefix(url?: string) {
    if (LangKit.nullToDefault(url, '').trim() === '') {
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
  public static getSuffix(url?: string) {
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
   * 是否后端渲染
   */
  public static isServer() {
    return typeof window === 'undefined';
  }

  /**
   * 服务嵌套
   * @param service
   * @param defResult
   */
  public static nilService(
    service: any,
    defResult: any = {},
  ): (...args: any | any[]) => Promise<any> {
    return service ? service : async (...args: any[]) => defResult;
  }

  /**
   * 匹配html标签
   * @param content
   * @param tagRegex
   */
  public static matchHtmlTag(content: string = '', tagRegex: string): HtmlTagType[] {
    // tagRegex = h[1-6]

    // 1. 匹配标签
    let matchTagRegex = new RegExp(
      `<\\s*(${tagRegex})[^>]*>([\\s|\\S]*?)<\\s*/\\s*\\1>`,
      'ig',
    );
    let htmlTag = content.match(matchTagRegex) ?? [];

    // 2. 提取标签、文本、属性
    return htmlTag.map((html: string) => {
      // 2.1 提取标签
      let nameRegex = new RegExp(`<\\s*(${tagRegex})(\\s|>)`, 'ig');
      let nameResult = html.match(nameRegex);
      let name;
      if (nameResult && nameResult.length >= 0) {
        name = `${nameResult[0]}`;
        if (name.startsWith('<')) {
          name = name.replace('<', '');
        }
        if (name.endsWith('>')) {
          name = name.replace('>', '');
        }
        name = name.trim();
      }

      // 2.1 提取文本
      let textRegex = new RegExp(`>([\\s|\\S]*?)</`, 'ig');
      let textResult = html.match(textRegex) || [];
      let text;
      if (textResult.length > 0) {
        text = textResult[0];
        text = text.replace('>', '').replace('</', '');
      }

      let key;
      if (text !== undefined) {
        key = `${text}`.trim().replace(/(\n|\s)/g, '-');
      }

      // 2.2 提取属性
      let attr: Record<string, any> = {};
      let attrNameRegex = new RegExp(`\\s(\\S*?)=`, 'ig');
      let attrNameResult = html.match(attrNameRegex);
      if (attrNameResult && attrNameResult.length > 0) {
        (attrNameResult || [])
          .map((item) => item.trim().replace('=', '').replace('\\s', ''))
          .forEach((name) => {
            let attrValueRegex = new RegExp(`${name}="(\\S*?)"`, 'ig');
            console.log('html', html, attrValueRegex);
            let attrValueResult = html.match(attrValueRegex);
            let attrValue;
            if (attrValueResult && attrValueResult.length > 0) {
              attrValue = attrValueResult[0]
                .trim()
                .replace(`${name}=`, '')
                .replace(`"`, '');
            }
            attr[`${name}`] = attrValue;
          });
      }
      return { key, html, name, text, attr } as HtmlTagType;
    });
  }

  public static isDev() {
    // @ts-ignore
    return process.env.NODE_ENV === 'development';
  }

  /**
   * 转为map
   * @param items
   * @param fieldKey
   */
  static toMap2(items: any[] = [], fieldKey: string): Record<string, any> {
    let result: Record<string, any> = {};
    items.forEach(item => result[item[`${fieldKey}`]] = item);
    return result;
  }
}
