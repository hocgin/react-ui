import * as React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/TbButton';
import { BoldOutlined, CodeOutlined } from '@ant-design/icons';

export const CodeBlock: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='代码块'
    disabled={!editor?.isActive('codeBlock')}
    onClick={() =>
      editor?.chain().focus().toggleCodeBlock().run()
    }
  >
    <CodeOutlined />
  </TbButton>
);

