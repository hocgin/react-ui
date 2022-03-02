import * as React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/TbButton';
import { BoldOutlined, DashOutlined } from '@ant-design/icons';

export const HorizontalRule: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='插入分割线'
    disabled={!editor?.isActive('codeBlock')}
    onClick={() =>
      editor?.chain().focus().setHorizontalRule().run()
    }>
    <DashOutlined />
  </TbButton>
);

