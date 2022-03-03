import React, { useEffect, useState } from 'react';
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
import ExTaskList from '@tiptap/extension-task-list';
import ExTaskItem from '@tiptap/extension-task-item';
import ExDropcursor from '@tiptap/extension-dropcursor';
import ExTable from '@tiptap/extension-table';
import ExTableRow from '@tiptap/extension-table-row';
import ExTableHeader from '@tiptap/extension-table-header';
import ExCodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import ExMention from '@tiptap/extension-mention';
import {
  HexColorDecorator,
  MentionSuggestion,
  LineHeight as ExLineHeight,
  FontSize as ExFontSize,
  TableCell as ExTableCell,
} from '../Extension';
import classnames from 'classnames';
import { Divider } from 'antd';
import FloatingMenus from '../FloatingMenus';

import {
  Bold,
  Underline,
  BulletList,
  SetLink,
  Emoji,
  OrderedList,
  FontSize,
  Paragraph,
  Italic,
  TextScript,
  Strike,
  TextAlign,
  Color,
  Highlight,
  ClearStyle,
  CodeBlock,
  HardBreak,
  HorizontalRule,
  Undo,
  Redo,
  Blockquote,
  TaskList,
  InsertCard,
  TableCtl,
  FillTableBackground,
  LineHeight,
} from '../Action';
import { useUpdateEffect, useExternal, useToggle } from 'ahooks';

// @ts-ignore
import { lowlight } from 'lowlight/lib/core';

lowlight.registerLanguage('css', require('highlight.js/lib/languages/css'));

import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import TbButton from '@/Editor/components/TbButton';
import { useImperativeHandle } from 'react';
import { Mention } from '@/Editor/components/Extension/Suggestion/Mention/Suggestion';

const Index: React.FC<{
  editorRef: any;
  header?: any;
  value?: string;
  className?: string;
  fullscreen?: boolean;
  editable?: boolean;
  onChange?: (v: string) => void;
  onSearchMention?: (keyword: string) => Mention[] | undefined;
  onChangeFullscreen?: (fullscreen: boolean) => void;
}> = (
  {
    className,
    header,
    onChangeFullscreen,
    editorRef,
    fullscreen = false,
    editable = true,
    value,
    onSearchMention,
  },
) => {
  // 导入css
  useExternal('//highlightjs.org/static/demo/styles/base16/ia-dark.css');
  let [isFullscreen, { toggle: toggleFullscreen, set: setFullscreen }] =
    useToggle<boolean>(fullscreen);
  let [editorEditable, setEditorEditable] = useState<boolean>(editable);
  useUpdateEffect(() => onChangeFullscreen?.(isFullscreen), [isFullscreen]);
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
      ExTaskList,
      ExLineHeight,
      ExTable.configure({ resizable: true }),
      ExTableRow,
      ExTableCell.configure(),
      ExTableHeader,
      ExTaskItem.configure({
        nested: true,
      }),
      ExFontSize,
      HexColorDecorator,
      ExPlaceholder.configure({
        placeholder: '请输入内容..',
      }),
      ExMention.configure({
        suggestion: onSearchMention ? MentionSuggestion(onSearchMention) : undefined,
      }),
    ],
    content: value,
    editable: editorEditable,
  });
  useEffect(() => editor?.setEditable?.(editorEditable), [editor]);
  useImperativeHandle(
    editorRef,
    () => ({
      getHTML: editor?.getHTML.bind(editor),
      getJSON: editor?.getJSON.bind(editor),
      setEditable: (editable: boolean) => {
        editor?.setEditable(editable);
        setEditorEditable(editable);
      },
      setFullscreen: setFullscreen.bind(this),
    }),
    [editor],
  );

  return (
    <div className={classnames(styles.editor, className)}>
      <div
        className={classnames(styles.editorWrapper, {
          [styles.fullscreen]: isFullscreen,
          [styles.mini]: !isFullscreen,
        })}
      >
        {header}
        {editorEditable && (
          <div
            className={classnames(styles.header, {
              [styles.hide]: !isFullscreen,
            })}
            onTouchStart={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          >
            <div style={{ flex: 1 } as any}>
              {isFullscreen && (
                <div className={styles.tpToolbar}>
                  <InsertCard editor={editor} />
                  <Divider type={'vertical'} />
                  <Undo editor={editor} />
                  <Redo editor={editor} />
                  <Divider type={'vertical'} />
                  <ClearStyle editor={editor} />
                  {/*字体*/}
                  <Divider type={'vertical'} />
                  <Paragraph editor={editor} />
                  <FontSize editor={editor} />
                  <Bold editor={editor} />
                  <Italic editor={editor} />
                  <Strike editor={editor} />
                  <Underline editor={editor} />
                  <TextScript editor={editor} />
                  {/*颜色*/}
                  <Divider type={'vertical'} />
                  <Color editor={editor} />
                  <Highlight editor={editor} />
                  <FillTableBackground editor={editor} />
                  {/*位置*/}
                  <TextAlign editor={editor} />
                  <OrderedList editor={editor} />
                  <BulletList editor={editor} />
                  <LineHeight editor={editor} />
                  <TableCtl editor={editor} />
                  {/*其他*/}
                  <Divider type={'vertical'} />
                  <TaskList editor={editor} />
                  <CodeBlock editor={editor} />
                  <Blockquote editor={editor} />
                  <SetLink editor={editor} />
                  <HorizontalRule editor={editor} />
                  <HardBreak editor={editor} />
                  <Emoji editor={editor} />
                </div>
              )}
            </div>
            <TbButton className={styles.toggleFull} onClick={toggleFullscreen}>
              {isFullscreen ? (
                <FullscreenExitOutlined />
              ) : (
                <FullscreenOutlined />
              )}
            </TbButton>
          </div>
        )}
        <div className={styles.content}>
          <EditorContent editor={editor} />
          {editor && <FloatingMenus editor={editor} />}
        </div>
        {!isFullscreen && editorEditable && (
          <div
            className={styles.btToolbar}
            onTouchStart={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          >
            <InsertCard editor={editor} />
            <Paragraph editor={editor} />
            <Bold editor={editor} />
            <OrderedList editor={editor} />
            <BulletList editor={editor} />
            <SetLink editor={editor} />
            <Emoji editor={editor} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
