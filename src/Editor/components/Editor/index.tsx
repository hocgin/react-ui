import * as React from 'react';
import styles from './index.less';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ExHighlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import ExUnderline from '@tiptap/extension-underline';
import ExStrike from '@tiptap/extension-strike';
import ExSubscript from '@tiptap/extension-subscript';
import ExSuperscript from '@tiptap/extension-superscript';
import ExTextStyle from '@tiptap/extension-text-style';
import ExCode from '@tiptap/extension-code';
import ExTextAlign from '@tiptap/extension-text-align';
import ExItalic from '@tiptap/extension-italic';
import ExPlaceholder from '@tiptap/extension-placeholder';
import ExTypography from '@tiptap/extension-typography';
import ExGapcursor from '@tiptap/extension-gapcursor';
import ExColor from '@tiptap/extension-color';
import ExDropcursor from '@tiptap/extension-dropcursor';
import ExCodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import ExMention from '@tiptap/extension-mention';
import { HexColorDecorator, MentionSuggestion, FontSize as ExFontSize } from '../Extension';
import classnames from 'classnames';
import { Divider } from 'antd';

import {
  Bold,
  Underline,
  BulletList,
  SetLink,
  Emoji,
  OrderedList,
  UnsetLink,
  FontSize,
  UploadImage,
  Paragraph,
  Italic,
  TextScript,
  Strike,
  TextAlign,
  Color,
  Highlight,
} from '../Action';
import { useExternal, useToggle } from 'ahooks';

// @ts-ignore
import { lowlight } from 'lowlight/lib/core';

lowlight.registerLanguage('css', require('highlight.js/lib/languages/css'));


import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import TbButton from '@/Editor/components/TbButton';

const Index: React.FC<{
  value?: string;
  className?: string;
  fullscreen?: boolean;
  editable?: boolean;
  onChange?: (v: string) => void;
}> = ({ fullscreen = false, editable = true, value }) => {
  // 导入css
  useExternal('//highlightjs.org/static/demo/styles/base16/ia-dark.css');
  let [isFullscreen, { toggle: toggleFullscreen }] =
    useToggle<boolean>(fullscreen);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      ExUnderline,
      ExTextStyle,
      ExItalic,
      ExCode,
      ExStrike,
      ExTextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ExHighlight.configure({ multicolor: true }),
      ExCodeBlockLowlight.configure({ lowlight }),
      ExSubscript,
      ExDropcursor,
      ExSuperscript,
      ExGapcursor,
      ExTypography,
      ExColor,
      ExFontSize.configure({
        types: ['paragraph'],
      }),
      HexColorDecorator,
      ExPlaceholder.configure({
        placeholder: '请输入内容..',
      }),
      ExMention.configure({
        suggestion: MentionSuggestion,
      }),
    ],
    content: value,
    editable: editable,
  });

  return (
    <div className={styles.editor}>
      <div
        className={classnames(styles.editorWrapper, {
          [styles.fullscreen]: isFullscreen,
          [styles.mini]: !isFullscreen,
        })}
      >
        <div
          className={styles.header}
          onTouchStart={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <div className={styles.tpToolbar}>
            <UploadImage editor={editor} />
            <Divider type={'vertical'} />
            <Paragraph editor={editor} />
            <FontSize editor={editor} />
            <Bold editor={editor} />
            <Italic editor={editor} />
            <Strike editor={editor} />
            <Underline editor={editor} />
            <TextScript editor={editor} />
            <Divider type={'vertical'} />
            <Color editor={editor} />
            <Highlight editor={editor} />
            <TextAlign editor={editor} />
            <OrderedList editor={editor} />
            <BulletList editor={editor} />
            <Divider type={'vertical'} />
            <SetLink editor={editor} />
            <Emoji editor={editor} />
          </div>
          <TbButton className={styles.toggleFull} onClick={toggleFullscreen}>
            {isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </TbButton>
        </div>
        <div className={styles.content}>
          <EditorContent editor={editor} />
          {editor && (
            <FloatingMenu
              editor={editor}
              pluginKey={'linkFloatingMenu'}
              className={styles.linkFloatingMenu}
              tippyOptions={
                {
                  placement: 'top',
                  duration: 100,
                  theme: 'light',
                } as any
              }
              shouldShow={({ editor, view, state, oldState }: any) => {
                const { from, to } = view.state.selection;
                const text = state.doc.textBetween(from, to, '');
                let isLink = editor.isActive('link');
                let isEmpty = !text;
                // link or select text
                return !isEmpty || isLink;
              }}
            >
              <SetLink editor={editor} />
              <UnsetLink editor={editor} />
            </FloatingMenu>
          )}
        </div>
        <div
          className={styles.btToolbar}
          onTouchStart={(e) => e.preventDefault()}
          onMouseDown={(e) => e.preventDefault()}
        >
          <UploadImage editor={editor} />
          <Paragraph editor={editor} />
          <Bold editor={editor} />
          <OrderedList editor={editor} />
          <BulletList editor={editor} />
          <SetLink editor={editor} />
          <Emoji editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Index;
