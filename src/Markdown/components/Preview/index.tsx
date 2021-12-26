import React, { Component } from 'react';
import styles from './index.less';

const Markdown: React.FC<any> = ({ ...rest }: any) => {
  try {
    let Uiw = require('@uiw/react-md-editor')?.default;
    console.log(Uiw);
    return <Uiw.Markdown {...rest} />;
  } catch (e) {
    return <div>需要安装 @uiw/react-md-editor</div>;
  }
};


const Index: React.FC<{
  children?: string;
}> = ({ children }, ref) => {
  return <><Markdown source={children} /></>;
};

export default Index;
