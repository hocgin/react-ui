import React from 'react';
import styles from './index.less';

const MDEditor: React.FC<any> = ({ ...rest }: any) => {
  try {
    let Uiw = require('@uiw/react-md-editor')?.default;
    console.log(Uiw);
    return <Uiw {...rest} />;
  } catch (e) {
    return <div>需要安装 @uiw/react-md-editor</div>;
  }
};


const Index: React.FC<{
  value: string;
  height?: number;
  onChange?: (value?: string) => void;
}> = ({ children, value, height, onChange }, ref) => {
  return <><MDEditor value={value} height={height} onChange={onChange} /></>;
};

export default Index;
