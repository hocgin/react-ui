import { Input } from 'antd';
import { AutoComplete } from '@uiw/react-amap';
import React, { useEffect, useRef, useState } from 'react';

/**
 * adcode: "350200"
 * address: []
 * city: []
 * district: "福建省厦门市"
 * id: "900000108751"
 * location: undefined
 * name: "厦门旅游客运码头-新港城客运站"
 * typecode: "999912"
 */

export interface SearchLbsData {
  name: string;
  adcode: string;
  address: string;
  location: { lng?: number, lat?: number };
}


const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  value?: string;
  onSelect?: (event: SearchLbsData) => void;
  onChange?: (v: any) => void;
  akay?: string;
}> = ({ ...props }) => {
  const inputRef = useRef<any>();
  const [input, setInput] = useState<string>();
  useEffect(() => {
    setInput(inputRef?.current?.input);
  }, [inputRef?.current]);
  return <Input.Group className={props.className} style={{ display: 'flex' } as any} compact>
    <div style={{ flex: '1 1' }}>
      <Input ref={inputRef} style={{ flex: '1 1' } as any}
             onChange={(e) => props?.onChange?.(e.target?.value)}
             value={props?.value} />
      <div style={{ width: '100%' }}>
        {input && (
          <AutoComplete
            datatype={'poi'}
            input={input}
            onSelect={({ poi }: any) => props?.onSelect?.(poi)}
          />
        )}
      </div>
    </div>
  </Input.Group>;
};

export default Index;
