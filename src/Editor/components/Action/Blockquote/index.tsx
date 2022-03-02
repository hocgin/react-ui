import * as React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/TbButton';
import { BoldOutlined, DisconnectOutlined } from '@ant-design/icons';

export const Blockquote: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='插入引用'
    onClick={() =>
      editor?.chain().focus().toggleBlockquote().run()
    }>
    <DisconnectOutlined />
  </TbButton>
);

