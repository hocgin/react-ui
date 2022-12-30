import { IPage, PageRo } from '@/_types';

export interface UseAction {
  paging: (ro: PageRo) => Promise<IPage>;
}
