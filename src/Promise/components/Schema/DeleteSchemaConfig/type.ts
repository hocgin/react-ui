import { ID } from '@/Utils/interface';

export interface UseAction {
  delete: (id: ID[]) => Promise<any | void>;
}
