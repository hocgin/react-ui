import moment from 'moment';
import { LocalDateTime } from '@/Utils/interface';

export default class DateTimeFormat {
  public static FORMAT_1 = 'YYYY-MM-DD HH:mm:ss';
  public static FORMAT_2 = 'YYYY-MM-DD HH:mm';
  public static FORMAT_3 = 'YYYY-MM-DD';
  public static FORMAT_4 = 'YYYY';
  public static FORMAT_5 = 'MM-DD';
  public static FORMAT_6 = 'HH:mm';
  public static FORMAT_7 = 'HH:mm:ss';

  // 2021-06-01T00:30:30.159
  static DEFAULT_FORMAT = moment.HTML5_FMT.DATETIME_LOCAL_MS;

  /**
   * 格式化时间
   * @param timestamp
   * @param format
   * @param def
   * @return {string}
   */
  static timestampAs(
    timestamp: number,
    format: string = DateTimeFormat.FORMAT_1,
    def: string = 'N/A',
  ): string {
    if (timestamp === null || timestamp === undefined) {
      return def;
    }
    return moment(timestamp).format(format);
  }

  /**
   * 相对时间
   * @param timestamp
   * @param len
   * @param defFormat
   * @return {string|*}
   */
  static relativeFromNow(
    timestamp: number,
    len = 10 * 24 * 60 * 60 * 1000,
    defFormat = DateTimeFormat.FORMAT_2,
  ): string {
    console.info('moment.locale()', moment.version, moment.locale());
    if (timestamp < new Date().getTime() - len) {
      return this.timestampAs(timestamp, defFormat);
    }

    return moment(timestamp).fromNow();
  }

  /**
   * 相对时间
   * @param localDatetime 2021-06-01T00:30:30.159
   * @return
   * -> 一天内 3分钟前
   * -> 一年内 09-11 11:30
   * -> 一年前 2020-06-01 11:30
   */
  static useDefRelativeFromNow(localDatetime?: LocalDateTime): string | undefined {
    let formatter = moment(localDatetime, DateTimeFormat.DEFAULT_FORMAT);
    if (!formatter.isValid()) {
      return localDatetime;
    }

    let timestamp = formatter.valueOf();
    let diffTimestamp = new Date().getTime() - timestamp;

    // 一天内 3分钟前
    if (diffTimestamp <= 24 * 60 * 60 * 1000) {
      return moment(timestamp).fromNow();
    }
    // 和当前是同一年内 09-11 11:30
    else if (diffTimestamp <= 365 * 24 * 60 * 60 * 1000 && formatter.year() === new Date().getFullYear()) {
      return formatter.format('MM-DD HH:mm');
    }
    // 2020-06-01 11:30
    else {
      return formatter.format('YYYY-MM-DD HH:mm');
    }
  }


  /**
   * 格式化时间
   * @param localDatetime 2021-06-01T00:30:30.159
   * @param defFormat 格式
   * @return 根据格式返回
   */
  static useDefLocalDatetime(localDatetime?: LocalDateTime, defFormat: string = DateTimeFormat.FORMAT_1): string {
    let formatter = moment(localDatetime, DateTimeFormat.DEFAULT_FORMAT);
    if (!formatter.isValid()) {
      return `${localDatetime}`;
    }

    return formatter.format(defFormat);
  }
}
