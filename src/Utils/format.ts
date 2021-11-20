import moment from 'moment';

export class DateFormat {
  static FORMAT_1 = 'YYYY-MM-DD HH:mm:ss';
  static FORMAT_2 = 'YYYY-MM-DD HH:mm';

  /**
   * 格式化时间
   * @param timestamp
   * @param format
   * @param def
   * @return {string}
   */
  static timestampAs(
    timestamp: number,
    format: string = DateFormat.FORMAT_1,
    def: string = 'N/A',
  ) {
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
    defFormat = DateFormat.FORMAT_2,
  ) {
    if (timestamp < new Date().getTime() - len) {
      return this.timestampAs(timestamp, defFormat);
    }
    return moment(timestamp).fromNow();
  }

  /**
   * 相对时间
   * 2021-06-01T00:30:30.159
   */
  static defRelativeFromNow(localDatetime: string) {
    return DateFormat.relativeFromNow(
      moment(localDatetime, moment.HTML5_FMT.DATETIME_LOCAL_MS).valueOf(),
    );
  }
}
