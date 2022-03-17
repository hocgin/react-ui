import * as React from 'react';
import { Editor } from '@tiptap/react';
import { FillBackground } from '../Icon';
import ColorDropdown from '@/Editor/components/ColorDropdown';

export const FillTableBackground: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  // editor?.getAttributes('textStyle').backgroundColor
  return (
    <ColorDropdown onClick={(color: string) => editor?.chain().focus().setCellAttribute('backgroundColor', color).run()}
                   renderIcon={FillBackground} />);
};

