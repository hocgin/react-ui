import React, {
  MutableRefObject,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { default as GEditor } from '@/Editor';
import Utils from '@/Utils';
import { Button, Skeleton } from 'antd';
import classnames from 'classnames';
import useAction from './use_action';
import { ID } from '@/Utils/interface';
import {
  DraftDoc,
  PublishedDoc,
  UseAction,
} from '@/Promise/components/Editor/types';
import { useInterval, useLockFn, useMount, useRequest } from 'ahooks';
import { EditorFn, getExtensions } from '@/Editor/components/Editor';
import { generateHTML, generateJSON } from '@tiptap/html';
import { ConfigContext } from '@/ConfigProvider';

const Header: React.FC<{
  headerRef: MutableRefObject<any>;
  title?: string;
  prefixCls?: string;
  onClickSave?: () => any;
}> = ({ onClickSave, title, headerRef, ...props }) => {
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
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('promise-editor--header', props.prefixCls);

  return (
    <div className={prefixCls}>
      <div className={'logo'} />
      <div className={'info'}>{title}</div>
      <div className={'toolbar'}>
        <div className={'tips'}>{tips}</div>
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

  if (getDrafted.loading) {
    return <div />;
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
    id?: ID;
    className?: string;
    prefixCls?: string;
    contentClassName?: string;
    defaultValue?: PublishedDoc;
  } & Record<string, any>
> = ({ id, className, contentClassName, defaultValue, ...props }: any) => {
  let [published, setPublished] = useState<PublishedDoc | undefined>(
    defaultValue,
  );

  let getPublished = useRequest(
    Utils.Lang.nilService(id ? useAction?.(id)?.getPublished : undefined, {}),
    {
      manual: true,
      onSuccess: setPublished,
    },
  );
  useMount(() => {
    !published && getPublished?.run();
  });
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('promise-editor--preview', props.prefixCls);
  return (
    <div className={prefixCls}>
      <Skeleton
        title
        paragraph={{ rows: 8 } as any}
        loading={!published && getPublished.loading}
      >
        <GEditor
          {...props}
          value={published?.content}
          editable={false}
          contentClassName={classnames('content', contentClassName)}
          className={classnames('editor', className)}
        />
      </Skeleton>
    </div>
  );
};

export const HtmlPreview: React.FC<
  {
    className?: string;
    contentClassName?: string;
    value?: string;
    prefixCls?: string;
  } & Record<string, any>
> = ({ className, value, ...props }: any) => {
  let extensions = getExtensions();
  const html = useMemo(() => {
    return generateHTML(generateJSON(value, extensions), extensions);
  }, [value]);
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('promise-editor--preview', props.prefixCls);
  return (
    <div className={classnames(prefixCls, 'ProseMirror', className)}>
      <div dangerouslySetInnerHTML={{ __html: html } as any} />
    </div>
  );
};

// 编辑模式全屏
// 编辑模式非全屏
// 非编辑模式_自动拉伸
