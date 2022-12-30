import { TreeNode, TreeRo } from '@/_types';

export interface UseAction {
  tree: (ro?: TreeRo) => Promise<TreeNode[]>;
}
