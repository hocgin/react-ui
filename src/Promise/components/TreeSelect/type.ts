import { TreeNode } from '@/_types';

export interface UseAction {
  initialValues: () => Promise<TreeNode[]>;
}
