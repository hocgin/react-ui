import React from 'react';
import RandExp from 'randexp';
import { Button, Input, Tooltip } from 'antd';
import { SyncOutlined, CopyOutlined, CheckOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useInterval } from 'ahooks';

const Index: React.FC<{
  started?: boolean;
  prefix?: string;
  // https://www.npmjs.com/package/randexp
  randExp?: any;
  value?: string;
  onChange?: (value: string) => void;
}> = (
  {
    prefix = '',
    onChange,
    started = true,
    value = undefined,
    randExp = /[a-z0-9]{16}/,
  },
  ref,
) => {
  let [text, setText] = useState<string | undefined>(value);
  let [init, setInit] = useState(true);
  let [copied, setCopied] = useState(false);
  useInterval(() => setCopied?.(false), 2000);
  let checkStyle = { color: '#00B06D' };
  let randExpGx = new RandExp(randExp);

  let setPrefixValue = (v?: string) => {
    let newValue = `${prefix}${v}`;
    setText(newValue);
    onChange?.(newValue);
  };

  let onRandom = () => {
    setPrefixValue(randExpGx.gen());
  };
  if (value === undefined && init && started) {
    setInit(false);
    onRandom();
  }
  return (
    <Input.Group style={{ display: 'flex' } as any} compact>
      <Input
        style={{ flex: '1 1' } as any}
        value={text}
        onChange={(e) => setPrefixValue(e?.target?.value)}
      />
      <Tooltip title="摇一下">
        <Button onClick={onRandom} icon={<SyncOutlined />} />
      </Tooltip>
      <Button
        icon={
          copied ? (
            <CheckOutlined style={checkStyle} />
          ) : (
            <CopyToClipboard
              text={`${value}`}
              onCopy={() => !copied && setCopied(true)}
            >
              <CopyOutlined />
            </CopyToClipboard>
          )
        }
      />
    </Input.Group>
  );
};

export default Index;
