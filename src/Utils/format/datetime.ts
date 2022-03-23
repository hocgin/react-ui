import moment from 'moment';
import { LocalDateTime } from '@/Utils/interface';

export default class DateTimeFormat {
  public static FORMAT_1 = 'YYYY-MM-DD HH:mm:ss';
  public static FORMAT_2 = 'YYYY-MM-DD HH:mm';
  public static FORMAT_3 = 'YYYY-MM-DD';

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
    if (timestamp < new Date().getTime() - len) {
      return this.timestampAs(timestamp, defFormat);
    }
    return moment(timestamp).fromNow();
  }

  /**
   * 相对时间
   * @param localDatetime 2021-06-01T00:30:30.159
   * @return 3分钟前
   */
  static useDefRelativeFromNow(localDatetime?: LocalDateTime): string | undefined {
    let formatter = moment(localDatetime, DateTimeFormat.DEFAULT_FORMAT);
    if (!formatter.isValid()) {
      return localDatetime;
    }
    return DateTimeFormat.relativeFromNow(
      formatter.valueOf(),
    );
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
