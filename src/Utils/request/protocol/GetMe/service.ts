import { ID } from '@/Utils/interface';
import { Dom, useGet } from '@hocgin/ui';
import { UserInfo } from './type';

export default class {

  static getMe(id: ID): Promise<UserInfo> {
    return useGet(`/api/account/me`)
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }
}
