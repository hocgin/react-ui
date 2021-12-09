import { Option } from '@/Utils/types/rt-grass';

export interface UseAction {
  initialValues: (keyword?: string) => Promise<Option[]>;
}
