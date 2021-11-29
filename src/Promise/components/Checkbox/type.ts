import { Option } from '@/Utils/types/rt-grass';

export interface UseAction {
  initialValues: () => Promise<Option[]>;
}
