import * as React from 'react';
import { Editor } from '@tiptap/react';
import { FontColors } from '../Icon';
import ColorDropdown from '@/Editor/components/ColorDropdown';

export const Color: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  // editor?.getAttributes('textStyle').color
  return (<ColorDropdown onClick={(color: string) => editor?.chain().focus().setColor(color).run()}
                         renderIcon={FontColors} />);
};

