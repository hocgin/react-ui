import * as React from 'react';
import { Editor } from '@tiptap/react';
import MeDropdown from '@/Editor/components/MeDropdown';
import styles from './index.less';

export const FontSize: React.FC<{
  editor?: Editor | null,
  placement?: 'top' | 'bottom',
}> = ({ editor, placement = 'top' }) => {
  let fontSizes = ['12px', '13px', '14px', '16px', '19px', '22px', '24px', '29px', '32px', '40px', '48px'];

  let menus = fontSizes.map((fontSize) => ({
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

  return <MeDropdown placement={placement} menus={menus} titleClassName={styles.title} defaultValue='15px' />;
};

