import { useGet, usePost, Dom } from '@hocgin/ui';
import { ID, ScrollRo } from '@/Utils/interface';
import {
  DraftDoc,
  HistoryDocContent,
  PublishedDoc,
} from '@/Promise/components/Editor/types';

export default class {
  static getPublishedDoc(id: ID): Promise<PublishedDoc> {
    return useGet(`/rcm/doc/${id}`)
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static getDraftedDoc(id: ID): Promise<DraftDoc> {
    return useGet(`/rcm/doc/${id}/content`)
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static draft(id: ID, payload: { doctype: string; content: string }) {
    return usePost(`/rcm/doc/${id}/content`, {
      data: { ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static publish(id: ID) {
    return usePost(`/rcm/doc/${id}/publish`)
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static history(id: ID, payload: ScrollRo): Promise<HistoryDocContent[]> {
    return usePost(`/rcm/doc/${id}/history`, {
      data: { ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static rollback(id: ID, payload: { docContentId: ID }) {
    return usePost(`/rcm/doc/${id}/rollback`, {
      data: { ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }

  static createVersion(contentId: ID, payload: { title: string }) {
    return usePost(`/rcm/doc/version/${contentId}/name`, {
      data: { ...payload },
    })
      .then(Dom.tryErrorIfExits)
      .then(Dom.thenData)
      .catch(Dom.showErrorMessage);
  }
}
