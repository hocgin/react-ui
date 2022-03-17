import * as React from 'react';
import { Editor } from '@tiptap/react';
import Icon from '@ant-design/icons';
import MeDropdown from '@/Editor/components/MeDropdown';
import styles from './index.less';
import { Moremark, Code, Subscript, Superscript } from '../Icon';


export const TextScript: React.FC<{ editor?: Editor | null }> = ({
                                                                   editor,
                                                                 }) => {
  let menus = [
    {
      key: 'superscript',
      title: <Icon component={Superscript.bind(this)} className={styles.icon} />,
      header: <><Icon component={Superscript.bind(this)} className={styles.smallIcon} /> 上标</>,
      onAction: () =>
        editor?.chain().focus().unsetSubscript().toggleSuperscript().run(),
      onMatched: () => editor?.isActive('superscript'),
    },
    {
      key: 'subscript',
      title: <Icon component={Subscript.bind(this)} className={styles.icon} />,
      header: <><Icon component={Subscript.bind(this)} className={styles.smallIcon} /> 下标</>,
      onAction: () =>
        editor?.chain().focus().unsetSuperscript().setSubscript().run(),
      onMatched: () => editor?.isActive('subscript'),
    },
    {
      key: 'code',
      title: <Icon component={Code.bind(this)} className={styles.icon} />,
      header: <><Icon component={Code.bind(this)} className={styles.smallIcon} /> 行内代码</>,
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

  return <MeDropdown menus={menus} titleClassName={styles.content}
                     defaultValue={<Icon component={Moremark.bind(this)} className={styles.icon} />} />;

};
