import * as React from 'react';
import { Editor } from '@tiptap/react';
import MeDropdown from '@/Editor/components/MeDropdown';
import styles from './index.less';

export const FontSize: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  let fontSizes = ['12px', '13px', '14px', '16px', '19px', '22px', '24px', '29px', '32px', '40px', '48px'];

  let menus = fontSizes.map((fontSize, index) => ({
    key: fontSize,
    title: fontSize,
    header: fontSize,
    onAction: () =>
      editor
        ?.chain()
        .focus()
        .setFontSize(fontSize)
        .run(),
    onMatched: () => {
      return editor?.isActive({ fontSize: fontSize });
    },
  }));

  return <MeDropdown menus={menus} titleClassName={styles.title} defaultValue='14px' />;
};

