import React from 'react';
import type {Editor} from '@tiptap/react';
import TbButton from '@/Editor/components/Common/TbButton';
import {SmileOutlined} from '@ant-design/icons';
import {Popover} from 'antd';

let Picker = React.lazy(() => {
  require('emoji-mart/css/emoji-mart.css')
  return require('emoji-mart').Picker;
});

export const Emoji: React.FC<{
  editor?: Editor | null;
  placement?: 'top' | 'bottom';
}> = ({editor, placement = 'top'}) => (
  <TbButton>
    <Popover
      placement={placement}
      trigger="click"
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
