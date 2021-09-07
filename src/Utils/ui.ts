import { message } from 'antd';
import memoizeOne from 'memoize-one';
import { HttpResult, IPage } from '@/Utils/interface';

export class Ui {
  static isSuccess(result?: HttpResult<any>) {
    return result && result.success;
  }

  static showErrorMessageIfExits(result?: HttpResult<any>) {
    if (Ui.isSuccess(result)) {
      return true;
    }
    console.debug('请求发生错误:', result);
    if (result?.message) {
      message.error(result.message).then(console.debug);
    }
    return false;
  };


  /**
   * 获取 paging 对象的列表数据
   * @param paging
   * @return {*|*[]}
   */
  static getPagingList(paging: IPage) {
    if (!paging) {
      return [];
    }
    return paging.records || [];
  }

  static fastGetPagingList = memoizeOne(this.getPagingList);

  /**
   * 获取分页的设置对象
   * @param paging
   * @return {{}}
   */
  static getPagingPagination(paging: IPage) {
    if (!paging) {
      return {};
    }
    return {
      total: paging.total,
      pageSize: paging.size,
      current: paging.current,
    };
  }

  static fastPagingPagination = memoizeOne(this.getPagingPagination);

  static getTableData(paging: IPage) {
    return {
      list: Ui.fastGetPagingList(paging),
      pagination: Ui.fastPagingPagination(paging),
    };
  }

  static fastGetTableData = memoizeOne(this.getTableData);

  /**
   * 获取域名
   */
  static getDomain() {
    return `${window.location.protocol}//${window.location.host}`;
  }
}
