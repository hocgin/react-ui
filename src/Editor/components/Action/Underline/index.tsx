import * as React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/TbButton';
import { BoldOutlined, UnderlineOutlined } from '@ant-design/icons';

export const Underline: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton title='下划线'
            onClick={() => editor?.chain().focus().toggleUnderline().run()}>
    <UnderlineOutlined />
  </TbButton>
);

