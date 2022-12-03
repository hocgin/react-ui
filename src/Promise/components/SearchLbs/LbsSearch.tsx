import { Input } from 'antd';
import { AutoComplete } from '@uiw/react-amap';
import React, { useEffect, useRef, useState } from 'react';
import { SearchLbsData } from '@/Promise/components/SearchLbs/types';

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
  return (
    <Input.Group
      className={props.className}
      style={{ display: 'flex' } as any}
      compact
    >
      <div style={{ flex: '1 1' }}>
        <Input
          ref={inputRef}
          style={{ flex: '1 1' } as any}
          onChange={(e) => props?.onChange?.(e.target?.value)}
          value={props?.value}
        />
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
    </Input.Group>
  );
};

export default Index;
