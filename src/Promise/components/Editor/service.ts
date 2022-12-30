import { useGet, usePost } from '@hocgin/hkit';
import { ID, ScrollRo } from '@/_types';
import {
  DraftDoc,
  HistoryDocContent,
  PublishedDoc,
} from '@/Promise/components/Editor/types';
import { StructKit, UIKit } from '@/_utils';

export default class {
  static getPublishedDoc(id: ID): Promise<PublishedDoc> {
    return useGet(`/api/rcm/doc/${id}`)
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static getDraftedDoc(id: ID): Promise<DraftDoc> {
    return useGet(`/api/rcm/doc/${id}/content`)
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static draft(id: ID, payload: { doctype: string; content: string }) {
    return usePost(`/api/rcm/doc/${id}/content`, {
      data: { ...payload },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static publish(id: ID) {
    return usePost(`/api/rcm/doc/${id}/publish`)
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static history(id: ID, payload: ScrollRo): Promise<HistoryDocContent[]> {
    return usePost(`/api/rcm/doc/${id}/history`, {
      data: { ...payload },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static rollback(id: ID, payload: { docContentId: ID }) {
    return usePost(`/api/rcm/doc/${id}/rollback`, {
      data: { ...payload },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }

  static createVersion(contentId: ID, payload: { title: string }) {
    return usePost(`/api/rcm/doc/version/${contentId}/name`, {
      data: { ...payload },
    })
      .then(StructKit.thenDataTryErrorIfExits)
      .catch(UIKit.showErrorMessage);
  }
}
