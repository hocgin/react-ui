import * as React from 'react';
import { Editor } from '@tiptap/react';
import MeDropdown from '@/Editor/components/MeDropdown';
import styles from './index.less';
import { LineHeightOutlined } from '@ant-design/icons';

export const LineHeight: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  let lineHeights = ['1', '1.15', '1.5', '2', '2.5', '3'];

  let menus = lineHeights.map((lineHeight) => ({
    key: lineHeight,
    header: lineHeight,
    onAction: () =>
      editor
        ?.chain()
        .focus()
        .setLineHeight(`${lineHeight}`)
        .run(),
    onMatched: () => false,
  }));

  return <MeDropdown menus={menus} titleClassName={styles.title} defaultValue={<LineHeightOutlined />} />;
};

