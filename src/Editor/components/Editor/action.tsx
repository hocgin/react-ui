import * as React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '../TbButton';
import MeDropdown from '../MeDropdown';
import {
  BoldOutlined,
  LineOutlined,
  LinkOutlined,
  OrderedListOutlined,
  SmileOutlined,
  PictureOutlined,
  AlignCenterOutlined,
  UnderlineOutlined,
  ItalicOutlined,
  UnorderedListOutlined,
  AlignRightOutlined,
  AlignLeftOutlined,
  StrikethroughOutlined,
} from '@ant-design/icons';
import { Popover, Upload, Menu, Dropdown } from 'antd';
import { Picker } from 'emoji-mart';
import { Dom } from '@/index';
import { useInterval } from 'ahooks';
import styles from './action.less';
import { useState } from 'react';

export const FontSize: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  let menus = [
    {
      key: '12px',
      title: '12px',
      header: '12px',
      onAction: () =>
        editor
          ?.chain()
          .focus()
          .setMark('textStyle', {
            fontSize: '12px',
          })
          .run(),
      onMatched: () => editor?.isActive('textStyle', { fontSize: '12px' }),
    },
    {
      key: '14px',
      title: '14px',
      header: '14px',
      onAction: () =>
        editor
          ?.chain()
          .focus()
          .setMark('textStyle', {
            fontSize: '14px',
          })
          .run(),
      onMatched: () => editor?.isActive('textStyle', { fontSize: '14px' }),
    },
  ];
  return <MeDropdown menus={menus} defaultValue={'14px'} />;
};

export const Paragraph: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  let menus = [
    {
      key: 'paragraph',
      title: '正文',
      header: '正文',
      onMatched: () => editor?.isActive('paragraph'),
      onAction: () => editor?.chain().focus().setParagraph().run(),
    },
    {
      key: 'h4',
      title: '标题4',
      header: <h4>标题4</h4>,
      onMatched: () => editor?.isActive('heading', { level: 4 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      key: 'h3',
      title: '标题3',
      header: <h3>标题3</h3>,
      onMatched: () => editor?.isActive('heading', { level: 3 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      key: 'h2',
      title: '标题2',
      header: <h2>标题2</h2>,
      onMatched: () => editor?.isActive('heading', { level: 2 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      key: 'h1',
      title: '标题1',
      header: <h1>标题1</h1>,
      onMatched: () => editor?.isActive('heading', { level: 1 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
  ];

  return <MeDropdown menus={menus} defaultValue={'paragraph'} />;
};

export const TextScript: React.FC<{ editor?: Editor | null }> = ({
  editor,
}) => {
  let menus = [
    {
      key: 'superscript',
      title: '上标',
      header: '上标',
      onAction: () =>
        editor?.chain().focus().unsetSubscript().toggleSuperscript().run(),
      onMatched: () => editor?.isActive('superscript'),
    },
    {
      key: 'subscript',
      title: '下标',
      header: '下标',
      onAction: () =>
        editor?.chain().focus().unsetSuperscript().setSubscript().run(),
      onMatched: () => editor?.isActive('subscript'),
    },
    {
      key: 'code',
      title: '行内代码',
      header: '行内代码',
      onAction: () =>
        editor
          ?.chain()
          .focus()
          .unsetSubscript()
          .unsetSuperscript()
          .setCode()
          .run(),
      onMatched: () => editor?.isActive('code'),
    },
  ];
  return <MeDropdown menus={menus} defaultValue={'A'} />;
};

export const TextAlign: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  let menus = [
    {
      key: 'left',
      title: <AlignLeftOutlined />,
      header: <AlignLeftOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('left').run(),
      onMatched: () => false,
    },
    {
      key: 'center',
      title: <AlignCenterOutlined />,
      header: <AlignCenterOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('center').run(),
      onMatched: () => false,
    },
    {
      key: 'right',
      title: <AlignRightOutlined />,
      header: <AlignRightOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('right').run(),
      onMatched: () => false,
    },
  ];
  return (
    <MeDropdown
      menus={menus}
      mode="horizontal"
      defaultValue={<AlignLeftOutlined />}
    />
  );
};

export const UploadImage: React.FC<{ editor?: Editor | null }> = ({
  editor,
}) => {
  let handleChange = ({ file, fileList }: any) => {
    fileList = fileList.map((file: any) => {
      let result = file.response;
      if (result) {
        // Component will show file.url as link
        if (Dom.showErrorMessageIfExits(result)) {
          file.url = result?.data;
        } else {
          file.status = 'error';
        }
      }
      return file;
    });
    if (fileList.length >= 1 && fileList[0]?.url) {
      let src = fileList[0]?.url;
      editor?.chain().focus().setImage({ src: src }).run();
    }
  };
  return (
    <TbButton title="图片" className={styles.uploadImage}>
      <Upload
        accept={'image/*'}
        withCredentials
        name="file"
        maxCount={1}
        action={'/api/com/file/upload'}
        headers={{}}
        onChange={handleChange}
      >
        <PictureOutlined />
      </Upload>
    </TbButton>
  );
};

export const Bold: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="加粗"
    onClick={() => editor?.chain().focus().toggleBold().run()}
  >
    <BoldOutlined />
  </TbButton>
);

export const Underline: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="下划线"
    onClick={() => editor?.chain().focus().toggleUnderline().run()}
  >
    <UnderlineOutlined />
  </TbButton>
);

export const Color: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <div style={{ height: 26, margin: '0 4px' } as any}>
    <input
      type="color"
      onInput={(event: any) =>
        editor?.chain().focus().setColor(event.target.value).run()
      }
      value={editor?.getAttributes('textStyle').color}
    />
  </div>
);

export const Italic: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="倾斜"
    onClick={() => editor?.chain().focus().toggleItalic().run()}
  >
    <ItalicOutlined />
  </TbButton>
);

export const Strike: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="删除线"
    onClick={() => editor?.chain().focus().toggleStrike().run()}
  >
    <StrikethroughOutlined />
  </TbButton>
);

export const OrderedList: React.FC<{ editor?: Editor | null }> = ({
  editor,
}) => (
  <TbButton
    title="有序列表"
    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
  >
    <OrderedListOutlined />
  </TbButton>
);

export const BulletList: React.FC<{ editor?: Editor | null }> = ({
  editor,
}) => (
  <TbButton
    title="无序列表"
    onClick={() => editor?.chain().focus().toggleBulletList().run()}
  >
    <UnorderedListOutlined />
  </TbButton>
);

export const EmojiAction: React.FC<{ editor?: Editor | null }> = ({
  editor,
}) => (
  <TbButton>
    <Popover
      placement="top"
      trigger="click"
      content={
        <Picker
          onSelect={(emoji: any) =>
            editor?.chain().insertContent(emoji.native).run()
          }
        />
      }
    >
      <SmileOutlined />
    </Popover>
  </TbButton>
);

export const SetLink: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="链接"
    onClick={() => {
      let defValue = editor?.getAttributes('link').href;
      const href: any = window.prompt('URL', defValue);
      let unsetHref = `${href}`.trim() === '';
      let { view, state } = editor || {};
      const { from, to } = view!.state.selection;
      const text = state?.doc.textBetween(from, to, '');
      let isEmpty = !text;
      if (isEmpty && !unsetHref) {
        let defTitle = '链接';
        editor
          ?.chain()
          .focus()
          .insertContent(defTitle)
          .setTextSelection({
            from: from,
            to: from + defTitle.length,
          })
          .run();
      }

      if (unsetHref) {
        editor?.chain().focus().extendMarkRange('link')?.unsetLink().run();
        return;
      } else {
        editor
          ?.chain()
          .focus()
          .extendMarkRange('link')
          ?.setLink({ href })
          .run();
      }
    }}
  >
    <LinkOutlined />
  </TbButton>
);

export const UnsetLink: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title="取消链接"
    disabled={!editor?.isActive('link')}
    onClick={() =>
      editor?.chain().focus().extendMarkRange('link')?.unsetLink().run()
    }
  >
    <LineOutlined />
  </TbButton>
);
