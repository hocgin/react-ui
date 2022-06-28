import React, { useEffect, useState } from 'react';
import { ConfigProvider } from '@/index';
import classnames from 'classnames';
import { Console, Hook, Unhook } from 'console-feed';

const LogsContainer: React.FC<{
  prefixCls?: string;
  className?: string;
}> = ({ ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  let prefixCls = getPrefixCls('console', props.prefixCls);

  const [logs, setLogs] = useState<any>([]);

  // run once!
  useEffect(() => {
    let hookedConsole = Hook(window.console, (log) => setLogs((currLogs: any) => [...currLogs, log]), false);
    return () => {
      Unhook(hookedConsole);
    };
  }, []);

  return <div className={classnames(`${prefixCls}--content`, props.className)}>
    <Console logs={logs} variant='light' />
  </div>;
};


const Index: React.FC<{
  prefixCls?: string;
  className?: string;
}> = ({ ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  let prefixCls = getPrefixCls('console', props.prefixCls);
  let [visible, setVisible] = useState<boolean>(false);

  return (
    <div className={classnames(`${prefixCls}`, {
      [`${prefixCls}--visible`]: visible,
    })}>
      <button
        className={classnames(`${prefixCls}--toggle`)}
        onClick={() => setVisible(!visible)}
      >
        {visible ? '-' : '+'}
      </button>
      <LogsContainer />
    </div>
  );
};

export default Index;
