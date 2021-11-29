import { IPage, PageRo } from '@/Utils/interface';

export interface UseAction {
  paging: (ro: PageRo) => Promise<IPage>;
}
