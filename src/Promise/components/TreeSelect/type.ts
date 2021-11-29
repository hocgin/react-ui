import { TreeNode } from '@/Utils/interface';

export interface UseAction {
  initialValues: () => Promise<TreeNode[]>;
}
