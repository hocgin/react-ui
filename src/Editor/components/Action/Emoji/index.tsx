import * as React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '@/Editor/components/TbButton';
import { SmileOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
// @ts-ignore
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

export const Emoji: React.FC<{
  editor?: Editor | null,
  placement?: 'top' | 'bottom',
}> = ({
        editor, placement = 'top',
      }) => (
  <TbButton>
    <Popover
      placement={placement}
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

