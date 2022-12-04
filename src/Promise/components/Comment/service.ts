import { usePost, useGet } from '@hocgin/hkit';
import { ID } from '@/Utils/interface';
import { StructKit, UIKit } from '@/_utils';

export default class {
  static reply(refType: any, refId: any, commentId?: ID, content?: string) {
    return usePost(`/api/com/comment/${refType}/${refId}/reply`, {
      data: { commentId, content },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static scroll(refType: any, refId: any, payload: any = {}) {
    return usePost(`/api/com/comment/${refType}/${refId}/_scroll`, {
      data: { ...payload },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static paging(refType: any, refId: any, parentId: ID, payload: any = {}) {
    return usePost(`/api/com/comment/${refType}/${refId}/_paging`, {
      data: { parentId, ...payload },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static like(refType: any, refId: any, commentId: ID) {
    return usePost(`/api/com/comment/${refType}/${refId}/like`, {
      data: { commentId },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static history(refType: any, refId: any, commentId: ID) {
    return useGet(`/api/com/comment/${refType}/${refId}/history/${commentId}`)
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static dislike(refType: any, refId: any, commentId: ID) {
    return usePost(`/api/com/comment/${refType}/${refId}/like`, {
      data: { commentId },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static report(refType: any, refId: any, commentId: ID, reason: string) {
    return usePost(`/api/com/comment/${refType}/${refId}/report`, {
      data: { commentId, reason },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }
}
