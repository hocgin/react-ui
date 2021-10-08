export default class Lang {

  /**
   * /sd/sd/sd => ["/sd", "/sd/sd", "/sd/sd/sd"]
   * @param url
   * @return {string[]}
   */
  static urlToList(url: string) {
    const urllist = url.split('/').filter(i => i);
    return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
  }


  /**
   * 拆分数组
   * chunk([1,2,3,4,5], 2) => [[1,2], [3, 4], [5]]
   * @param array
   * @param length
   * @returns {Array}
   */
  static chunk(array: [], length: number) {
    let index = 0;
    let newArray = [];

    while (index < array.length) {
      newArray.push(array.slice(index, index += length));
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
  static slice(array: [], max: number) {
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
  static distinct(array = []) {
    return Array.from(new Set(array));
  }

  /**
   * 删除指定位置
   * @param array
   * @param index
   */
  static delete(array = [], index: number) {
    array.splice(index, 1);
    return array;
  }

}
