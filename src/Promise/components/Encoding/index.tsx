import * as React from 'react';
import RandExp from 'randexp';
import { Button, Input, Tooltip } from 'antd';
import styles from './index.less';
import { SyncOutlined, CopyOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Index: React.FC<{
  started?: boolean;
  prefix?: string;
  // https://www.npmjs.com/package/randexp
  randExp?: any;
  defaultValue?: string;
  onChange?: (value: string) => void;
}> = (
  { prefix, onChange, started = true, defaultValue, randExp = /[a-z0-9]{16}/ },
  ref,
) => {
  let [value, setValue] = useState<string>();
  let [init, setInit] = useState(true);
  let randExpGx = new RandExp(randExp);

  let setPrefixValue = (v?: string) => {
    let newValue = `${prefix}${v}`;
    setValue(newValue);
    onChange?.(newValue);
  };

  let onRandom = () => {
    setPrefixValue(randExpGx.gen());
  };
  if (init && started) {
    setInit(false);
    onRandom();
  }

  return (
    <Input.Group className={styles.view} compact>
      <Input
        className={styles.input}
        value={value}
        onChange={(e) => setPrefixValue(e?.target?.value)}
        defaultValue={defaultValue}
      />
      <Tooltip title="摇一下">
        <Button onClick={onRandom} icon={<SyncOutlined />} />
      </Tooltip>
      <Tooltip title="复制">
        <CopyToClipboard text={`${value}`}>
          <Button icon={<CopyOutlined />} />
        </CopyToClipboard>
      </Tooltip>
    </Input.Group>
  );
};

export default Index;
