import { useGet, usePost, Dom } from '@hocgin/ui';
import { ID } from '@/Utils/interface';

export default class {
  static reply(refType: any, refId: any, commentId?: ID, content?: string) {
    return usePost(`/com/comment/${refType}/${refId}/reply`, {
      data: { commentId, content },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static scroll(refType: any, refId: any, payload: any = {}) {
    return usePost(`/com/comment/${refType}/${refId}/_scroll`, {
      data: { ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static paging(refType: any, refId: any, parentId: ID, payload: any = {}) {
    return usePost(`/com/comment/${refType}/${refId}/_paging`, {
      data: { parentId, ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static like(refType: any, refId: any, commentId: ID) {
    return usePost(`/com/comment/${refType}/${refId}/like`, {
      data: { commentId },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static dislike(refType: any, refId: any, commentId: ID) {
    return usePost(`/com/comment/${refType}/${refId}/like`, {
      data: { commentId },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static report(refType: any, refId: any, commentId: ID, reason: string) {
    return usePost(`/com/comment/${refType}/${refId}/report`, {
      data: { commentId, reason },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static getCurrentUser() {
    return useGet(`/ums/account`, {})
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static searchUser(payload: any = {}) {
    return usePost(`/ums/user/_complete`, {
      data: { ...payload },
    }).then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }
}
