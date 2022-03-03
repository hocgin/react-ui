/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React, { useRef, useState } from 'react';
import { Editor, Header } from '@hocgin/ui';
import styles from './index.less';
import { Button, Divider } from 'antd';
import { useBoolean, useToggle } from 'ahooks';
import classnames from 'classnames';

const content = `
      <a href='https://www.baidu.com'>ksjdkHi</a>
      #FB5151
      <p><img src='https://source.unsplash.com/8xznAGy4HcY/800x400' /></p>
      <h2>
        Hi there,
      </h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
      </p>
      <ul>
        <li>
          That’s a bullet list with one …
        </li>
        <li>
          … or two list items.
        </li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
      </p>
      <pre><code class='language-css'>body {
  display: none;
}</code></pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
      </p>
      <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
      </blockquote>
    `;

let onSearchMention = (query: string) => {
  return [
    'Lea Thompson',
    'Cyndi Lauper',
    'Tom Cruise',
    'Madonna',
    'Jerry Hall',
    'Joan Collins',
    'Winona Ryder',
    'Christina Applegate',
    'Alyssa Milano',
    'Molly Ringwald',
    'Ally Sheedy',
    'Debbie Harry',
    'Olivia Newton-John',
    'Elton John',
    'Michael J. Fox',
    'Axl Rose',
    'Emilio Estevez',
    'Ralph Macchio',
    'Rob Lowe',
    'Jennifer Grey',
    'Mickey Rourke',
    'John Cusack',
    'Matthew Broderick',
    'Justine Bateman',
    'Lisa Bonet',
  ]
    .filter(item => item.toLowerCase().startsWith(query.toLowerCase()))
    .slice(0, 5);
};

export default () => {
  let editorRef = useRef<any>();
  let [editable, setEditable] = useState<boolean>(true);
  let [fullscreen, setFullscreen] = useState<boolean>(false);
  let [unsetHeight, { toggle: toggleUnsetHeight }] = useToggle(false);
  let [text, setText] = useState<string>('');
  return (
    <>
      <Editor
        header={fullscreen ? <Header /> : <></>}
        onSearchMention={onSearchMention}
        editorRef={editorRef}
        editable={editable}
        fullscreen={fullscreen}
        className={classnames(styles.ok, {
          [styles.unsetHeight]: unsetHeight,
        })}
        value={content}
        onChangeFullscreen={(fullscreen) => setFullscreen(fullscreen)}
      />
      <Divider />
      <Button
        onClick={() => {
          setText(editorRef.current.getHTML());
        }}
      >
        获取HTML
      </Button>
      <Button
        onClick={() => {
          setText(JSON.stringify(editorRef.current.getJSON()));
        }}
      >
        获取JSON
      </Button>
      <Button
        onClick={() => {
          let b = !editable;
          editorRef.current.setEditable(b);
          setEditable(b);
        }}
      >
        {editable ? '可编辑' : '不可编辑'}
      </Button>
      <Button onClick={toggleUnsetHeight}>
        {unsetHeight ? '取消高度' : '恢复高度'}
      </Button>
      <Button
        onClick={() => {
          let b = !fullscreen;
          editorRef.current.setFullscreen(b);
          setFullscreen(b);
        }}
      >
        {fullscreen ? '全屏' : '非全屏'}
      </Button>
      <Divider />
      <div>{text}</div>
    </>
  );
};
