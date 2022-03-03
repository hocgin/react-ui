import * as React from 'react';
import styles from '@/Editor/components/Editor/index.less';
import { SetLink, UnsetLink } from '@/Editor/components/Action';
import { Editor, FloatingMenu } from '@tiptap/react';

const shouldShowLink = ({ editor, view, state, oldState }: any) => {
  const { from, to } = view.state.selection;
  const text = state.doc.textBetween(from, to, '');
  let isLink = editor.isActive('link');
  let isEmpty = !text;
  // link or select text
  return !isEmpty || isLink;
};

const Index: React.FC<{
  editor: Editor;
  defaultParams?: any;
}> = ({ editor }) => {
  return (<FloatingMenu editor={editor}
                        pluginKey={'floatingMenu'}
                        className={styles.linkFloatingMenu}
                        tippyOptions={
                          {
                            placement: 'top',
                            duration: 100,
                            theme: 'light',
                          } as any
                        }
                        shouldShow={(props: any) => {
                          console.log('editor', editor);
                          console.log('props', props);
                          return shouldShowLink(props);
                        }}>
    <>
      <SetLink editor={editor} />
      <UnsetLink editor={editor} />
    </>
  </FloatingMenu>);
};

export default Index;
