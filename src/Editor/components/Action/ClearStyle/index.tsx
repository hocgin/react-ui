import * as React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/TbButton';
import { BoldOutlined, DisconnectOutlined } from '@ant-design/icons';

export const ClearStyle: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='清除格式'
    onClick={() =>
      editor?.chain().focus().unsetAllMarks().clearNodes().run()
    }>
    <DisconnectOutlined />
  </TbButton>
);
