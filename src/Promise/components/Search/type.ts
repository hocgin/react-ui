import { SearchOption } from '@/_types';

export interface UseAction {
  initialValues: (keyword?: string) => Promise<SearchOption[]>;
}
