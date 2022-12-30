import { ID, ScrollRo } from '@/_types';

export interface PublishedDoc {
  ownerUserId: ID;
  ownerUserName: string;
  content: string;
  description: string;
}

export interface DraftDoc {
  ownerUserId: ID;
  contentId: ID;
  ownerUserName: string;
  content: string;
  description: string;
  draft: boolean;
}

export interface HistoryDocContent {
  id: ID;
  draft: boolean;
  title: string;
  createdAt: string;
}

export interface UseAction {
  getPublished: () => Promise<PublishedDoc>;
  getDrafted: () => Promise<DraftDoc>;
  draft: (doctype: string, content: string) => void;
  publish: () => void;
  rollback: (docContentId: ID) => void;
  createVersion: (docContentId: ID, title: string) => void;
  history: (scroll: ScrollRo) => Promise<HistoryDocContent[]>;
}
