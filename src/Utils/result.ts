import { HttpResult, IPage, Result } from './interface';
import { message } from 'antd';
import memoizeOne from 'memoize-one';

export class Struct {
  /**
   * 响应是否失败
   * @param result
   */
  static isFail(result?: HttpResult<any>): boolean {
    return !Struct.isSuccess(result);
  }

  /**
   * 响应是否成功
   * @param result
   */
  static isSuccess(result?: HttpResult<any>): boolean | undefined {
    return result && result.success;
  }

  /**
   * 获取数据
   * @deprecated
   * @param result
   */
  static getData(result?: HttpResult<any>): any {
    return result && result.data;
  }

  static thenData = Struct.getData;

  /**
   * 响应失败自动弹出提示
   * @param result
   */
  static showErrorMessageIfExits(result?: HttpResult<any>): boolean {
    if (Struct.isSuccess(result)) {
      return true;
    }

    if (result?.message) {
      message.error(result.message).then(console.debug);
    }
    return false;
  }

  /**
   * 过渡处理错误信息
   * @param result
   */
  static thenShowErrorIfExits(
    result?: HttpResult<any>,
  ): HttpResult<any> | undefined {
    if (Struct.isSuccess(result)) {
      return result;
    }

    if (result?.message) {
      message.error(result.message);
    }

    return result;
  }

  /**
   * 获取 FORM 提交表单的错误信息
   * @param errors
   */
  static getErrorMessage(errors: any): string | undefined {
    if (errors.errorFields && errors.errorFields.length > 0) {
      return errors.errorFields[0].errors[0];
    }

    let keys = Object.keys(errors || {});
    if (keys.length > 0) {
      return errors[keys[0]].message;
    }
    return undefined;
  }

  /**
   * 获取 paging 对象的列表数据
   * @param paging
   * @return {*|*[]}
   */
  static fastGetPagingList = memoizeOne(this.getPagingList);

  static getPagingList(paging?: IPage) {
    if (!paging) {
      return [];
    }
    return paging.records || [];
  }

  /**
   * 获取分页对象数组
   * @param result
   */
  static getPagingListForResult(result: Result<IPage>): any[] {
    if (!Struct.isSuccess(result)) {
      return [];
    }
    return Struct.getPagingList(result?.data || ({} as IPage));
  }

  /**
   * 获取分页的设置对象
   * @param paging
   * @return {{}}
   */
  static getPagingPagination(paging?: IPage) {
    if (!paging) {
      return {};
    }
    return {
      total: paging.total,
      pageSize: paging.size,
      current: paging.current,
      pages: paging.pages,
    };
  }

  static fastPagingPagination = memoizeOne(this.getPagingPagination);

  /**
   * 获取表单分页数据结构
   * @param paging
   */
  static getTableData(paging?: IPage) {
    return {
      list: Struct.fastGetPagingList(paging),
      pagination: Struct.fastPagingPagination(paging),
    };
  }

  static fastGetTableData = memoizeOne(this.getTableData);
}
