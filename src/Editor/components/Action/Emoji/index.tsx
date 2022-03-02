import * as React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/TbButton';
import { BoldOutlined, SmileOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { Picker } from 'emoji-mart';

export const Emoji: React.FC<{ editor?: Editor | null }> = ({
                                                              editor,
                                                            }) => (
  <TbButton>
    <Popover
      placement='top'
      trigger='click'
      content={
        <Picker
          onSelect={(emoji: any) =>
            editor?.chain().insertContent(emoji.native).run()
          }
        />
      }
    >
      <SmileOutlined />
    </Popover>
  </TbButton>
);

