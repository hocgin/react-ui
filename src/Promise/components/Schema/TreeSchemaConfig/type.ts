import { TreeNode, TreeRo } from '@/Utils/interface';

export interface UseAction {
  tree: (ro?: TreeRo) => Promise<TreeNode[]>;
}
