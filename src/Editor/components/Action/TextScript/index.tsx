import * as React from 'react';
import { Editor } from '@tiptap/react';
import MeDropdown from '@/Editor/components/MeDropdown';

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

