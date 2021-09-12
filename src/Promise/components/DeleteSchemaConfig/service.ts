import { Utils } from '@hocgin/ui';

export default {
  /**
   * 初始化数据
   * @param action
   * @param id
   */
  async deletes(action: string, id: any) {
    let ids = [id];
    if (id instanceof Array) {
      ids = id;
    }
    return Utils.Request.delete(action, { data: { id: ids } });
  },
};
