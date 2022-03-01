import * as React from 'react';
import { Editor } from '@tiptap/react';
import TbButton from '../TbButton';
import MeDropdown from '../MeDropdown';
import Icon, {
  BoldOutlined,
  HighlightOutlined,
  FontColorsOutlined,
  DashOutlined,
  UndoOutlined,
  RedoOutlined,
  CodeOutlined,
  DisconnectOutlined,
  LinkOutlined,
  OrderedListOutlined,
  SmileOutlined,
  PictureOutlined,
  AlignCenterOutlined,
  QuestionOutlined,
  UnderlineOutlined,
  ItalicOutlined,
  UnorderedListOutlined,
  AlignRightOutlined,
  AlignLeftOutlined,
  StrikethroughOutlined,
} from '@ant-design/icons';
import { Popover, Upload } from 'antd';
import { SketchPicker } from 'react-color';
import { Picker } from 'emoji-mart';
import { Dom } from '@/index';
import styles from './action.less';
import { useState } from 'react';

export const FontSize: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  let fontSizes = ['12px', '13px', '14px', '16px', '19px', '22px', '24px', '29px', '32px', '40px', '48px'];

  let menus = fontSizes.map((fontSize, index) => ({
    key: fontSize,
    title: fontSize,
    header: fontSize,
    onAction: () =>
      editor
        ?.chain()
        .focus()
        .setFontSize(fontSize)
        .run(),
    onMatched: () => editor?.isActive({ fontSize: fontSize }),
  }));

  return <MeDropdown menus={menus} defaultValue={'14px'} />;
};

export const Paragraph: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  let menus = [
    {
      key: 'paragraph',
      title: '正文',
      header: '正文',
      onMatched: () => editor?.isActive('paragraph'),
      onAction: () => editor?.chain().focus().setParagraph().run(),
    },
    {
      key: 'h4',
      title: '标题4',
      header: <h4>标题4</h4>,
      onMatched: () => editor?.isActive('heading', { level: 4 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 4 }).run(),
    },
    {
      key: 'h3',
      title: '标题3',
      header: <h3>标题3</h3>,
      onMatched: () => editor?.isActive('heading', { level: 3 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
    },
    {
      key: 'h2',
      title: '标题2',
      header: <h2>标题2</h2>,
      onMatched: () => editor?.isActive('heading', { level: 2 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
      key: 'h1',
      title: '标题1',
      header: <h1>标题1</h1>,
      onMatched: () => editor?.isActive('heading', { level: 1 }),
      onAction: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
    },
  ];

  return <MeDropdown menus={menus} defaultValue={'正文'} />;
};

export const TextScript: React.FC<{ editor?: Editor | null }> = ({
                                                                   editor,
                                                                 }) => {
  let menus = [
    {
      key: 'superscript',
      title: '上标',
      header: '上标',
      onAction: () =>
        editor?.chain().focus().unsetSubscript().toggleSuperscript().run(),
      onMatched: () => editor?.isActive('superscript'),
    },
    {
      key: 'subscript',
      title: '下标',
      header: '下标',
      onAction: () =>
        editor?.chain().focus().unsetSuperscript().setSubscript().run(),
      onMatched: () => editor?.isActive('subscript'),
    },
    {
      key: 'code',
      title: '行内代码',
      header: '行内代码',
      onAction: () =>
        editor
          ?.chain()
          .focus()
          .unsetSubscript()
          .unsetSuperscript()
          .setCode()
          .run(),
      onMatched: () => editor?.isActive('code'),
    },
  ];
  return <MeDropdown menus={menus} defaultValue={'A'} />;
};

export const TextAlign: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  let menus = [
    {
      key: 'left',
      title: <AlignLeftOutlined />,
      header: <AlignLeftOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('left').run(),
      onMatched: () => editor?.isActive({ textAlign: 'left' }),
    },
    {
      key: 'center',
      title: <AlignCenterOutlined />,
      header: <AlignCenterOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('center').run(),
      onMatched: () => editor?.isActive({ textAlign: 'center' }),
    },
    {
      key: 'right',
      title: <AlignRightOutlined />,
      header: <AlignRightOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('right').run(),
      onMatched: () => editor?.isActive({ textAlign: 'right' }),
    },
    {
      key: 'justify',
      title: <QuestionOutlined />,
      header: <QuestionOutlined />,
      onAction: () => editor?.chain().focus().setTextAlign('justify').run(),
      onMatched: () => editor?.isActive({ textAlign: 'justify' }),
    },
  ];
  return (
    <MeDropdown
      menus={menus}
      mode='horizontal'
      defaultValue={<AlignLeftOutlined />}
    />
  );
};

export const UploadImage: React.FC<{ editor?: Editor | null }> = ({
                                                                    editor,
                                                                  }) => {
  let handleChange = ({ file, fileList }: any) => {
    fileList = fileList.map((file: any) => {
      let result = file.response;
      if (result) {
        // Component will show file.url as link
        if (Dom.showErrorMessageIfExits(result)) {
          file.url = result?.data;
        } else {
          file.status = 'error';
        }
      }
      return file;
    });
    if (fileList.length >= 1 && fileList[0]?.url) {
      let src = fileList[0]?.url;
      editor?.chain().focus().setImage({ src: src }).run();
    }
  };
  return (
    <TbButton title='图片' className={styles.uploadImage}>
      <Upload
        accept={'image/*'}
        withCredentials
        name='file'
        maxCount={1}
        action={'/api/com/file/upload'}
        headers={{}}
        onChange={handleChange}
      >
        <PictureOutlined />
      </Upload>
    </TbButton>
  );
};

export const Bold: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='加粗'
    onClick={() => editor?.chain().focus().toggleBold().run()}
  >
    <BoldOutlined />
  </TbButton>
);

export const Underline: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='下划线'
    onClick={() => editor?.chain().focus().toggleUnderline().run()}
  >
    <UnderlineOutlined />
  </TbButton>
);

export const Color: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  // editor?.getAttributes('textStyle').color
  let [color, setColor] = useState<string>('#000');
  let FontColorsSvg = (color: string) => (
    <svg width='18px' height='18px' viewBox='0 0 240 240' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <title>icon/字体颜色</title>
      <g id='icon/字体颜色' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
        <g transform='translate(0.000000, 0.500000)'>
          <g transform='translate(39.000000, 17.353553)'>
            <path
              d='M11,201.146447 L167,201.146447 C173.075132,201.146447 178,206.071314 178,212.146447 C178,218.221579 173.075132,223.146447 167,223.146447 L11,223.146447 C4.92486775,223.146447 7.43989126e-16,218.221579 0,212.146447 C-7.43989126e-16,206.071314 4.92486775,201.146447 11,201.146447 Z'
              id='矩形' fill={color} fill-rule='evenodd'></path>
            <path
              d='M72.3425855,16.8295583 C75.799482,7.50883712 86.1577877,2.75526801 95.4785089,6.21216449 C100.284516,7.99463061 104.096358,11.7387855 105.968745,16.4968188 L106.112518,16.8745422 L159.385152,161.694068 C161.291848,166.877345 158.635655,172.624903 153.452378,174.531599 C148.358469,176.405421 142.719567,173.872338 140.716873,168.864661 L140.614848,168.598825 L89.211,28.86 L37.3759214,168.623816 C35.4885354,173.712715 29.8981043,176.351047 24.7909589,174.617647 L24.5226307,174.522368 C19.4337312,172.634982 16.7953993,167.044551 18.5287999,161.937406 L18.6240786,161.669077 L72.3425855,16.8295583 Z'
              id='路径-21' fill='#262626' fill-rule='nonzero'></path>
            <path
              d='M121,103.146447 C126.522847,103.146447 131,107.623599 131,113.146447 C131,118.575687 126.673329,122.994378 121.279905,123.142605 L121,123.146447 L55,123.146447 C49.4771525,123.146447 45,118.669294 45,113.146447 C45,107.717207 49.3266708,103.298515 54.7200952,103.150288 L55,103.146447 L121,103.146447 Z'
              id='路径-22' fill='#262626' fill-rule='nonzero'></path>
          </g>
        </g>
      </g>
    </svg>);
  return (<Popover content={<SketchPicker color={color} onChangeComplete={(color: any) => {
    setColor(color.hex);
    editor?.chain().focus().setColor(color.hex).run();
  }} />} trigger='click'>
    <TbButton>
      <Icon component={FontColorsSvg.bind(this, color)} />
    </TbButton>
  </Popover>);
};

export const Highlight: React.FC<{ editor?: Editor | null }> = ({ editor }) => {
  // editor?.getAttributes('textStyle').backgroundColor
  let [color, setColor] = useState<string>('#000');
  let HighlightColorSvg = (color: string) => (
    <svg width='18px' height='18px' viewBox='0 0 256 256' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <title>icon/填充色</title>
      <g id='icon/填充色' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
        <g id='icon/背景颜色'>
          <g id='编组' fill='#262626'>
            <g
              transform='translate(119.502295, 137.878331) rotate(-135.000000) translate(-119.502295, -137.878331) translate(48.002295, 31.757731)'
              id='矩形'>
              <path
                d='M100.946943,60.8084699 L43.7469427,60.8084699 C37.2852111,60.8084699 32.0469427,66.0467383 32.0469427,72.5084699 L32.0469427,118.70847 C32.0469427,125.170201 37.2852111,130.40847 43.7469427,130.40847 L100.946943,130.40847 C107.408674,130.40847 112.646943,125.170201 112.646943,118.70847 L112.646943,72.5084699 C112.646943,66.0467383 107.408674,60.8084699 100.946943,60.8084699 Z M93.646,79.808 L93.646,111.408 L51.046,111.408 L51.046,79.808 L93.646,79.808 Z'
                fill-rule='nonzero'></path>
              <path
                d='M87.9366521,16.90916 L87.9194966,68.2000001 C87.9183543,69.4147389 86.9334998,70.399264 85.7187607,70.4 L56.9423078,70.4 C55.7272813,70.4 54.7423078,69.4150264 54.7423078,68.2 L54.7423078,39.4621057 C54.7423078,37.2523513 55.5736632,35.1234748 57.0711706,33.4985176 L76.4832996,12.4342613 C78.9534987,9.75382857 83.1289108,9.5834005 85.8093436,12.0535996 C87.1658473,13.303709 87.9372691,15.0644715 87.9366521,16.90916 Z'
                fill-rule='evenodd'></path>
              <path
                d='M131.3,111.241199 L11.7,111.241199 C5.23826843,111.241199 0,116.479467 0,122.941199 L0,200.541199 C0,207.002931 5.23826843,212.241199 11.7,212.241199 L131.3,212.241199 C137.761732,212.241199 143,207.002931 143,200.541199 L143,122.941199 C143,116.479467 137.761732,111.241199 131.3,111.241199 Z M124,130.241 L124,193.241 L19,193.241 L19,130.241 L124,130.241 Z'
                fill-rule='nonzero'></path>
            </g>
          </g>
          <path
            d='M51,218 L205,218 C211.075132,218 216,222.924868 216,229 C216,235.075132 211.075132,240 205,240 L51,240 C44.9248678,240 40,235.075132 40,229 C40,222.924868 44.9248678,218 51,218 Z'
            id='矩形' fill={color}></path>
        </g>
      </g>
    </svg>);
  return (<Popover content={<SketchPicker color={color} onChangeComplete={(color: any) => {
    setColor(color.hex);
    editor?.chain().focus().toggleHighlight({ color: color.hex }).run();
  }} />} trigger='click'>
    <TbButton>
      <Icon component={HighlightColorSvg.bind(this, color)} />
    </TbButton>
  </Popover>);
};

export const Italic: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='倾斜'
    onClick={() => editor?.chain().focus().toggleItalic().run()}
  >
    <ItalicOutlined />
  </TbButton>
);

export const Strike: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='删除线'
    onClick={() => editor?.chain().focus().toggleStrike().run()}
  >
    <StrikethroughOutlined />
  </TbButton>
);

export const OrderedList: React.FC<{ editor?: Editor | null }> = ({
                                                                    editor,
                                                                  }) => (
  <TbButton
    title='有序列表'
    onClick={() => editor?.chain().focus().toggleOrderedList().run()}
  >
    <OrderedListOutlined />
  </TbButton>
);

export const BulletList: React.FC<{ editor?: Editor | null }> = ({
                                                                   editor,
                                                                 }) => (
  <TbButton
    title='无序列表'
    onClick={() => editor?.chain().focus().toggleBulletList().run()}
  >
    <UnorderedListOutlined />
  </TbButton>
);

export const EmojiAction: React.FC<{ editor?: Editor | null }> = ({
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

export const SetLink: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='链接'
    onClick={() => {
      let defValue = editor?.getAttributes('link').href;
      const href: any = window.prompt('URL', defValue);
      let unsetHref = `${href}`.trim() === '';
      let { view, state } = editor || {};
      const { from, to } = view!.state.selection;
      const text = state?.doc.textBetween(from, to, '');
      let isEmpty = !text;
      if (isEmpty && !unsetHref) {
        let defTitle = '链接';
        editor
          ?.chain()
          .focus()
          .insertContent(defTitle)
          .setTextSelection({
            from: from,
            to: from + defTitle.length,
          })
          .run();
      }

      if (unsetHref) {
        editor?.chain().focus().extendMarkRange('link')?.unsetLink().run();
        return;
      } else {
        editor
          ?.chain()
          .focus()
          .extendMarkRange('link')
          ?.setLink({ href })
          .run();
      }
    }}
  >
    <LinkOutlined />
  </TbButton>
);

export const UnsetLink: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='取消链接'
    disabled={!editor?.isActive('link')}
    onClick={() =>
      editor?.chain().focus().extendMarkRange('link')?.unsetLink().run()
    }
  >
    <DisconnectOutlined />
  </TbButton>
);

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

export const Blockquote: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='插入引用'
    disabled={!editor?.isActive('codeBlock')}
    onClick={() =>
      editor?.chain().focus().toggleBlockquote().run()
    }>
    <DisconnectOutlined />
  </TbButton>
);
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
export const HardBreak: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='换行'
    disabled={!editor?.isActive('codeBlock')}
    onClick={() =>
      editor?.chain().focus().setHardBreak().run()
    }>
    <DisconnectOutlined />
  </TbButton>
);

export const ClearStyle: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='清除格式'
    onClick={() =>
      editor?.chain().focus().unsetAllMarks().clearNodes().run()
    }>
    <DisconnectOutlined />
  </TbButton>
);

export const Undo: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='撤回'
    onClick={() =>
      editor?.chain().focus().undo().run()
    }>
    <UndoOutlined />
  </TbButton>
);

export const Redo: React.FC<{ editor?: Editor | null }> = ({ editor }) => (
  <TbButton
    title='恢复'
    onClick={() =>
      editor?.chain().focus().redo().run()
    }>
    <RedoOutlined />
  </TbButton>
);
