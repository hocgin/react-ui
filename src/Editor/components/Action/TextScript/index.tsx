import * as React from 'react';
import { Editor } from '@tiptap/react';
import Icon from '@ant-design/icons';
import MeDropdown from '@/Editor/components/MeDropdown';
import styles from './index.less';

const MoremarkSvg = () => {
  return <>
    <svg style={{ display: 'none' } as any}>
      <symbol xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256' id='ne-t-moremark'>
        <g fill='#262626' fill-rule='evenodd'>
          <path
            d='M54 41h136c5.523 0 10 4.477 10 10s-4.477 10-10 10H54c-5.523 0-10-4.477-10-10s4.477-10 10-10Z' />
          <path d='M112 52h20v166c0 5.523-4.477 10-10 10s-10-4.477-10-10V52Z' />
          <path
            d='M229 9c-12.15 0-22 9.85-22 22s9.85 22 22 22 22-9.85 22-22-9.85-22-22-22Zm0 14a8 8 0 1 1 0 16 8 8 0 0 1 0-16ZM200.694 185.79c5.147 5.147 5.22 13.447.218 18.683l-.218.223-20.246 20.245c-3.905 3.905-10.236 3.905-14.142 0-3.839-3.839-3.904-10.023-.195-13.941l.195-.201 15.557-15.557-15.557-15.556c-3.839-3.839-3.904-10.023-.195-13.941l.195-.2c3.84-3.84 10.023-3.905 13.942-.196l.2.195 20.246 20.246ZM43.31 185.79c-5.146 5.147-5.219 13.447-.217 18.683l.218.223 20.245 20.245c3.906 3.905 10.237 3.905 14.142 0 3.84-3.839 3.905-10.023.196-13.941l-.196-.201-15.556-15.557 15.556-15.556c3.84-3.839 3.905-10.023.196-13.941l-.196-.2c-3.839-3.84-10.022-3.905-13.941-.196l-.2.195L43.31 185.79Z'
            fill-rule='nonzero' />
        </g>
      </symbol>
    </svg>
    <svg className='ne-icon-symbol' aria-hidden='true'>
      <use xlinkHref='#ne-t-moremark' />
    </svg>
  </>;
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


  return <MeDropdown menus={menus} defaultValue={<Icon component={MoremarkSvg.bind(this)} className={styles.icon} />} />;

};
