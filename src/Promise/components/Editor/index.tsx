import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Editor as GEditor } from '@hocgin/ui';
import styles from './index.less';
import { Button } from 'antd';
import useAction from './use_action';
import { ID } from '@/Utils/interface';
import { DraftDoc, UseAction } from '@/Promise/components/Editor/types';
import { useInterval } from 'ahooks';
import { EditorFn } from '@/Editor/components/Editor';

const Header: React.FC<{
  title?: string;
  onClickSave?: () => void;
}> = ({ onClickSave, title }) => {
  return (
    <div className={styles.header}>
      <div className={styles.logo} />
      <div className={styles.info}>{title}</div>
      <div>
        <Button type="primary" onClick={onClickSave}>
          保存
        </Button>
      </div>
    </div>
  );
};

export const Editor: React.FC<{
  id: ID;
  title?: string;
  className?: string;
}> = ({ id, title }) => {
  let action: UseAction = useAction(id);
  let editorRef = useRef<EditorFn>();
  let [draft, setDraft] = useState<DraftDoc | undefined>();

  useEffect(() => {
    action.getDrafted().then(setDraft);
  }, []);

  let saveDraft = async () => {
    editorRef.current?.setEditable(false);
    let html = editorRef.current?.getHTML();
    if (!html) {
      return;
    }
    await action.draft('html', html);
  };

  let onClickSave = async () => {
    await saveDraft();
    await action.publish();
    editorRef.current?.setEditable(true);
  };

  // 30s 自动保存一次
  useInterval(saveDraft, 30 * 1000);

  return (
    <div>
      <GEditor
        value={draft?.content}
        header={<Header onClickSave={onClickSave} title={title} />}
        editorRef={editorRef}
        editable={true}
      />
    </div>
  );
};
