import { ID } from '@/_types';

export interface UseAction {
  delete: (id: ID[]) => Promise<any | void>;
}
