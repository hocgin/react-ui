import { Option } from '@/_types';

export interface UseAction {
  initialValues: () => Promise<Option[]>;
}
