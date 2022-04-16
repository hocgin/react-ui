import { Dom, useGet, usePost } from '@hocgin/ui';
import { UserInfo } from './type';
import { stringify } from 'querystring';

export default class {

  /**
   * 获取当前用户信息
   * @param force true 表示一定需要登陆
   */
  static getCurrentUser(force: boolean = false): Promise<UserInfo> {
    return useGet(`/api/ums/account/me?${stringify({ force })}`)
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  /**
   * 搜索用户列表
   * @param payload
   */
  static searchUser(payload: any = {}) {
    return usePost(`/api/ums/user/_complete`, {
      data: { ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }
}
