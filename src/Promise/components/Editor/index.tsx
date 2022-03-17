import React, {
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Editor as GEditor, Utils } from '@hocgin/ui';
import styles from './index.less';
import { Button } from 'antd';
import classnames from 'classnames';
import useAction from './use_action';
import { ID } from '@/Utils/interface';
import {
  DraftDoc,
  PublishedDoc,
  UseAction,
} from '@/Promise/components/Editor/types';
import { useInterval, useLockFn, useMount, useRequest } from 'ahooks';
import { EditorFn } from '@/Editor/components/Editor';

const Header: React.FC<{
  headerRef: MutableRefObject<any>;
  title?: string;
  onClickSave?: () => any;
}> = ({ onClickSave, title, headerRef }) => {
  let [tips, setTips] = useState<string>('');

  useImperativeHandle(
    headerRef,
    () => ({
      setTips: setTips.bind(this),
    }),
    [],
  );

  useInterval(() => {
    if (!!tips) {
      setTips('');
    }
  }, 3 * 1000);

  return (
    <div className={styles.header}>
      <div className={styles.logo} />
      <div className={styles.info}>{title}</div>
      <div className={styles.toolbar}>
        <div className={styles.tips}>{tips}</div>
        <Button type="primary" onClick={onClickSave}>
          保存
        </Button>
      </div>
    </div>
  );
};

export const Editor: React.FC<{
  id: ID;
  editorRef: MutableRefObject<EditorFn | undefined>;
  title?: string;
  className?: string;
  onClickSave?: () => void;
}> = ({ id, onClickSave, editorRef, className, title }) => {
  let action: UseAction = useAction(id);
  let headerRef = useRef<any>();
  let [draft, setDraft] = useState<DraftDoc | undefined>();
  let [fullscreen, setFullscreen] = useState<boolean>(false);

  let getDrafted = useRequest(Utils.Lang.nilService(action?.getDrafted, {}), {
    manual: true,
    onSuccess: setDraft,
  });

  useMount(() => getDrafted?.run());

  let saveDraft = async () => {
    headerRef.current?.setTips('正在自动保存...');
    let html = editorRef.current?.getHTML() ?? '';
    await action.draft('html', html);
    headerRef.current?.setTips('自动保存成功');
  };

  // 30s 自动保存一次
  useInterval(saveDraft, 30 * 1000);

  let onClickSaveFn = useLockFn(async () => {
    await saveDraft();
    await action.publish();
    onClickSave?.();
  });

  if (getDrafted.loading || !draft) {
    return <></>;
  }
  return (
    <>
      <GEditor
        className={className}
        onChangeFullscreen={setFullscreen}
        value={draft?.content}
        header={
          fullscreen ? (
            <Header
              headerRef={headerRef}
              onClickSave={onClickSaveFn}
              title={title}
            />
          ) : null
        }
        editorRef={editorRef}
        editable={true}
      />
    </>
  );
};

export const Preview: React.FC<
  {
    id: ID;
    className?: string;
    contentClassName?: string;
    defaultValue?: PublishedDoc;
  } & Record<string, any>
> = ({ id, className, contentClassName, defaultValue, ...props }: any) => {
  let [published, setPublished] = useState<PublishedDoc | undefined>(
    defaultValue,
  );

  if (!published) {
    let action: UseAction = useAction(id);
    let getPublished = useRequest(
      Utils.Lang.nilService(action?.getPublished, {}),
      {
        manual: true,
        onSuccess: setPublished,
      },
    );

    useMount(() => getPublished?.run());

    if (getPublished?.loading) {
      return <div>加载...</div>;
    }
  }

  return (
    <div className={styles.preview}>
      <GEditor
        {...props}
        value={published?.content}
        editable={false}
        contentClassName={classnames(styles.content, contentClassName)}
        className={classnames(styles.editor, className)}
      />
    </div>
  );
};

// 编辑模式全屏
// 编辑模式非全屏
// 非编辑模式_自动拉伸
