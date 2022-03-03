import React, { useRef } from 'react';
import { Editor } from '@hocgin/ui';
import styles from './index.less';
import { Button } from 'antd';

const Header: React.FC<{
  title?: string;
}> = ({ title }) => {
  return (<div className={styles.header}>
    <div className={styles.logo} />
    <div className={styles.info}>{title}</div>
    <div>
      <Button type='primary'>保存</Button>
    </div>
  </div>);
};

export const EditorPage: React.FC<{
  title?: string;
  className?: string;
  defaultParams?: any;
}> = ({ title }) => {
  return <div>
    <Editor header={<Header title={title} />}
            editorRef={useRef()} fullscreen={true} editable={true} />
  </div>;
};

