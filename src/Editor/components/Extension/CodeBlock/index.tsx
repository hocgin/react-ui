import CodeBlock, { CodeBlockOptions } from '@tiptap/extension-code-block';
import CodeBlockView from './CodeBlockView';

export interface CodeBlockLowlightOptions extends CodeBlockOptions {
  defaultLanguage: string | null | undefined;
}

export default CodeBlock.extend<CodeBlockLowlightOptions>({
  addOptions() {
    return {
      ...this.parent?.(),
      defaultLanguage: null,
    };
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      return new CodeBlockView(
        node,
        editor.view,
        getPos as () => number,
        node?.attrs?.language ?? this.options?.defaultLanguage,
      );
    };
  },
});
