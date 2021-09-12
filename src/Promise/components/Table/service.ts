import { Utils } from '@hocgin/ui';

export default {
  /**
   * 分页查询
   * @param action
   * @param data
   */
  async paging(action: string, data: any = {}) {
    return Utils.Request.post(`${action}/_paging`, { data: { ...data } });
  },
};
