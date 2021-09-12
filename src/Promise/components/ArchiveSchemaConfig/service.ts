import { Utils } from '@hocgin/ui';

export default {
  /**
   * 初始化表单数据
   * @param action
   * @param id
   */
  async initialValues(action?: string, id?: any) {
    return Utils.Request.get(`${action}/${id}`);
  },

  /**
   * 提交数据
   * @param isUpdate
   * @param action
   * @param id
   * @param body
   */
  async submit(isUpdate: boolean, action?: string, id?: any, body?: any) {
    let url = `${action}`;
    let method = 'POST';
    if (isUpdate) {
      url += `/${id}`;
      method = 'PUT';
    }
    return Utils.Request(url, {
      method: method,
      data: { ...body },
    });
  },
};
