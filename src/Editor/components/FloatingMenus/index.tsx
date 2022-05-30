import React from 'react';

import { SetLink, UnsetLink } from '@/Editor/components/Action';
import { Editor, FloatingMenu } from '@tiptap/react';
import { ConfigContext } from '@/ConfigProvider';

const shouldShowLink = ({ editor, view, state, oldState }: any) => {
  let editable = view?.editable;
  const { from, to } = view.state.selection;
  const text = state.doc.textBetween(from, to, '');
  let isLink = editor.isActive('link');
  let isEmpty = !text;
  // link or select text
  return editable && (!isEmpty || isLink);
};

const Index: React.FC<{
  editor: Editor;
  defaultParams?: any;
  prefixCls?: string;
}> = ({ editor, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('editor-e-floatingMenu', props.prefixCls);

  return (
    // @ts-ignore
    <FloatingMenu
      editor={editor}
      pluginKey={'floatingMenu'}
      className={prefixCls}
      tippyOptions={
        {
          placement: 'top',
          duration: 100,
          theme: 'light',
        } as any
      }
      shouldShow={(props: any) => {
        return shouldShowLink(props);
      }}
    >
      <>
        <SetLink editor={editor} />
        <UnsetLink editor={editor} />
      </>
    </FloatingMenu>
  );
};

export default Index;
