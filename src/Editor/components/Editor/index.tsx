import React, { MutableRefObject, useEffect, useState } from 'react';
import styles from './index.less';
import { HeartFilled } from '@hocgin/ui';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import ExHighlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import ExUnderline from '@tiptap/extension-underline';
import ExSubscript from '@tiptap/extension-subscript';
import ExSuperscript from '@tiptap/extension-superscript';
import ExTextStyle from '@tiptap/extension-text-style';
import ExTextAlign from '@tiptap/extension-text-align';
import ExPlaceholder from '@tiptap/extension-placeholder';
import ExColor from '@tiptap/extension-color';
import ExTaskList from '@tiptap/extension-task-list';
import ExTaskItem from '@tiptap/extension-task-item';
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
  Iframe as ExIframe,
  Image as ExImage,
  Indent as ExIndent,
  Print as ExPrint,
} from '../Extension';
import classnames from 'classnames';
import { Divider, Dropdown } from 'antd';
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
  Indent,
  Outdent,
  Print,
} from '../Action';
import { useUpdateEffect, useExternal, useToggle } from 'ahooks';

// @ts-ignore
import { lowlight } from 'lowlight/lib/core';

lowlight.registerLanguage('css', require('highlight.js/lib/languages/css'));

import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons';
import TbButton from '@/Editor/components/TbButton';
import { useImperativeHandle } from 'react';
import { Mention } from '@/Editor/components/Extension/Suggestion/Mention/Suggestion';

export interface EditorFn {
  getHTML: () => string;
  getJSON: () => any;
  setEditable: (editable: boolean) => void;
  setFullscreen: (fullscreen: boolean) => void;
}

const Index: React.FC<{
  editorRef?: MutableRefObject<EditorFn | undefined>;
  header?: any;
  value?: any;
  className?: string;
  placeholder?: string;
  contentClassName?: string;
  uploadImageUrl?: string;
  fullscreen?: boolean;
  editable?: boolean;
  onChange?: () => void;
  onSearchMention?: (keyword: string) => Mention[] | undefined;
  onChangeFullscreen?: (fullscreen: boolean) => void;
}> = ({
        onChange,
        className,
        placeholder = '',
        contentClassName,
        header,
        onChangeFullscreen,
        editorRef,
        fullscreen = false,
        editable = true,
        value,
        onSearchMention,
        uploadImageUrl = '/api/com/file/upload',
      }) => {
  // 导入css
  useExternal('//highlightjs.org/static/demo/styles/base16/ia-dark.css');
  let [isFullscreen, { toggle: toggleFullscreen, set: setFullscreen }] =
    useToggle<boolean>(fullscreen);
  let [editorEditable, setEditorEditable] = useState<boolean>(editable);
  useUpdateEffect(() => onChangeFullscreen?.(isFullscreen), [isFullscreen]);
  const editor = useEditor({
    onUpdate({ editor }) {
      onChange?.();
    },
    extensions: [
      StarterKit,
      ExImage.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      ExUnderline,
      ExTextStyle,
      ExCodeBlockLowlight.configure({ lowlight }),
      ExTextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      ExHighlight.configure({ multicolor: true }),
      ExSubscript,
      ExSuperscript,
      ExColor,
      ExTaskList,
      ExLineHeight,
      ExTable.configure({ resizable: true }),
      ExTableRow,
      ExTableCell.configure({}),
      ExTableHeader,
      ExFontSize,
      ExIndent,
      ExPrint,
      ExIframe,
      HexColorDecorator,
      ExTaskItem.configure({ nested: true }),
      ExMention.configure({
        suggestion: onSearchMention
          ? MentionSuggestion(onSearchMention)
          : undefined,
      }),
      ExPlaceholder.configure({
        placeholder: (props: any) => {
          return `${placeholder}` as string;
        },
      }),
    ],
    content: value,
    editable: editorEditable,
  });
  useUpdateEffect(() => {
    editor?.commands?.setContent?.(value);
  }, [value]);

  useEffect(() => editor?.setEditable?.(editorEditable), [editor]);
  useImperativeHandle(
    editorRef,
    () =>
      ({
        getHTML: editor?.getHTML.bind(editor),
        getJSON: editor?.getJSON.bind(editor),
        setEditable: (editable: boolean) => {
          editor?.setEditable(editable);
          setEditorEditable(editable);
        },
        clearContent: () => editor?.commands?.clearContent?.(true),
        setContent: (content: any) => editor?.commands?.setContent?.(content),
        setFullscreen: setFullscreen.bind(this),
      } as EditorFn),
    [editor],
  );

  let placement: any = isFullscreen ? 'bottom' : 'top';
  return (
    <>
      <Dropdown
        disabled={!editor?.isActive('table')}
        overlay={<TableCtl editor={editor} />}
        trigger={['contextMenu']}
      >
        <div className={classnames(styles.editor)}>
          <div
            className={classnames(styles.editorWrapper, className, {
              [styles.fullscreen]: isFullscreen,
              [styles.mini]: !isFullscreen,
              [styles.editable]: editable,
              [styles.noEditable]: !editable,
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
                <div className={styles.tpToolbarWrapper}>
                  {isFullscreen && (
                    <div className={styles.tpToolbar}>
                      <InsertCard
                        editor={editor}
                        uploadImageUrl={uploadImageUrl}
                        placement={placement}
                      />
                      <Divider type={'vertical'} />
                      <Undo editor={editor} />
                      <Redo editor={editor} />
                      <Divider type={'vertical'} />
                      <ClearStyle editor={editor} />
                      {/*字体*/}
                      <Divider type={'vertical'} />
                      <Paragraph editor={editor} placement={placement} />
                      <FontSize editor={editor} placement={placement} />
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
                      <Indent editor={editor} />
                      <Outdent editor={editor} />
                      {/*其他*/}
                      <Divider type={'vertical'} />
                      <TaskList editor={editor} />
                      <Print editor={editor} />
                      <CodeBlock editor={editor} />
                      <Blockquote editor={editor} />
                      <SetLink editor={editor} />
                      <HorizontalRule editor={editor} />
                      <HardBreak editor={editor} />
                      <Emoji editor={editor} placement={placement} />
                    </div>
                  )}
                </div>
                <TbButton
                  className={styles.toggleFull}
                  onClick={toggleFullscreen}
                >
                  {isFullscreen ? (
                    <FullscreenExitOutlined />
                  ) : (
                    <FullscreenOutlined />
                  )}
                </TbButton>
              </div>
            )}
            <div
              className={classnames(styles.content, contentClassName)}
              onClick={() => editor?.chain().focus().run()}
            >
              <EditorContent editor={editor} />
              {editor && <FloatingMenus editor={editor} />}
            </div>
            {!isFullscreen && editorEditable && (
              <div className={styles.btToolbar}>
                <div
                  className={styles.btActions}
                  onTouchStart={(e) => e.preventDefault()}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <InsertCard editor={editor} uploadImageUrl={uploadImageUrl} />
                  <Paragraph editor={editor} placement={placement} />
                  <Bold editor={editor} />
                  <OrderedList editor={editor} />
                  <BulletList editor={editor} />
                  <SetLink editor={editor} />
                  <Emoji editor={editor} />
                </div>
                <HeartFilled className={styles.heart} />
              </div>
            )}
          </div>
        </div>
      </Dropdown>
    </>
  );
};

export default Index;
