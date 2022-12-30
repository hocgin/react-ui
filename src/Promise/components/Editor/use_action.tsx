import { ID, ScrollRo } from '@/_types';
import service from './service';
import {
  DraftDoc,
  HistoryDocContent,
  PublishedDoc,
  UseAction,
} from '@/Promise/components/Editor/types';

export default (id: ID) =>
  ({
    getPublished: async () =>
      (await service.getPublishedDoc(id)) as PublishedDoc,
    getDrafted: async () => (await service.getDraftedDoc(id)) as DraftDoc,
    draft: async (doctype: string, content: string) =>
      await service.draft(id, { doctype, content }),
    publish: async () => await service.publish(id),
    rollback: async (docContentId: ID) =>
      await service.rollback(id, { docContentId }),
    createVersion: async (docContentId: ID, title: string) =>
      await service.createVersion(docContentId, { title }),
    history: async (scroll: ScrollRo) =>
      (await service.history(id, scroll)) as HistoryDocContent[],
  } as UseAction);
