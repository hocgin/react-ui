import React, { useState } from 'react';
import styles from './index.less';

const MDEditor: React.FC<any> = ({ value = '', onChange, ...rest }: any) => {
  let [text, setText] = useState<string>(value);
  try {
    let Uiw = require('@uiw/react-md-editor')?.default;
    return <div>
      <Uiw highlightEnable={false} value={text} onChange={(text: string) => {
        setText(text);
        onChange && onChange(text);
      }} />
    </div>;
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
