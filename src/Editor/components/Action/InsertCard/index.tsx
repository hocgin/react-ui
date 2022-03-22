import * as React from 'react';
import { Editor } from '@tiptap/react';
import { InsertImage } from './InsertImage';
import { InsertTable } from './InsertTable';
import { InsertVideo } from './InsertVideo';
import { Dropdown, Menu, Button } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import classnames from 'classnames';
import styles from './index.less';

export const InsertCard: React.FC<{
  editor?: Editor | null,
  className?: string,
  uploadImageUrl: string,
  placement?: 'top' | 'bottom',
}> = ({ editor, placement = 'top', uploadImageUrl, className }) => {
  const menu = (<Menu className={styles.menus}>
    <Menu.Item key={'InsertImage'}>
      <InsertImage editor={editor} uploadUrl={uploadImageUrl} />
    </Menu.Item>
    <Menu.Item key={'InsertTable'}>
      <InsertTable editor={editor} />
    </Menu.Item>
    <Menu.Item key={'InsertVideo'}>
      <InsertVideo editor={editor} />
    </Menu.Item>
  </Menu>);

  return (
    <Button type='text' title={'插入卡片'} className={classnames(styles.dropdown, className)}>
      <Dropdown overlay={menu} trigger={['click']} placement={placement}>
        <PlusCircleFilled className={styles.icon} />
      </Dropdown>
    </Button>
  );
};

