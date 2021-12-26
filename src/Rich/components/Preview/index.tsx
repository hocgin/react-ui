import React from 'react';
import styles from './index.less';
import { Utils } from '@hocgin/ui';

const Preview: React.FC<any> = ({ children, ...rest }: any) => {
  if (Utils.Lang.isServer()) {
    return <></>;
  }
  try {
    require('braft-extensions/dist/code-highlighter.css');
    let dangerouslySetInnerHTML = { __html: `${children}` };
    return <div className={styles.richPreview}>
      <div dangerouslySetInnerHTML={dangerouslySetInnerHTML} />
    </div>;
  } catch (e) {
    return <div>需要安装 @uiw/react-md-editor</div>;
  }
};

const Index: React.FC<{
  children?: string;
}> = ({ children }, ref) => {
  return <Preview>{children}</Preview>;
};

export default Index;
