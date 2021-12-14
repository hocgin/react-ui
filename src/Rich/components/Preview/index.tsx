import React, { Component } from 'react';
import styles from './index.less';
import { Utils } from '@/index';
import { useMount } from 'ahooks';

const Index: React.FC<{
  children?: string;
}> = ({ children }, ref) => {
  useMount(() => {
    if (Utils.Lang.isServer()) {
      return;
    }
    require('braft-extensions/dist/code-highlighter.css');
  });

  let dangerouslySetInnerHTML = { __html: `${children}` };
  return (
    <div className={styles.richPreview}>
      <div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
    </div>
  );
};

export default Index;
