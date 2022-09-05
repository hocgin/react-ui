import {Input} from "antd";
import {APILoader, AutoComplete} from "@uiw/react-amap";
import React, {useEffect, useRef, useState} from "react";

export interface AutoCompleteEventsCallback {
  /**POI唯一标识 */
  id: string;
  /**名称 */
  name: string;
  /**区域编码 */
  adcode: string;
  /**所属区域 */
  district: string;
  /**位置 */
  location: { lng?: number, lat?: number };
  /**类型 */
  type: string;
}


const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  onSelect?: (event: AutoCompleteEventsCallback) => void;
  akay?: string;
}> = ({...props}) => {
  const inputRef = useRef<any>();
  const [input, setInput] = useState<string>();
  useEffect(() => {
    console.log('inputref', inputRef);
    setInput(inputRef?.current?.input);
  }, [inputRef?.current]);
  return <Input.Group className={props.className} style={{display: 'flex'} as any} compact>
    <div style={{flex: '1 1'}}>
        <Input ref={inputRef} style={{flex: '1 1'} as any} />
        <div style={{width: '100%'}}>
          {input && (
            <AutoComplete
              input={input}
              onSelect={props?.onSelect}
            />
          )}
        </div>
    </div>
  </Input.Group>
}

export default Index;
