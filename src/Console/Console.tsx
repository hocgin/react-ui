import React, { useEffect, useState } from 'react';
import { ConfigProvider, Utils } from '@/index';
import classnames from 'classnames';

let ConsoleFeedImport = Utils.Lang.dynamicImport(() => require('console-feed'));

const LogsContainer: React.FC<{
  prefixCls?: string;
  className?: string;
}> = ({ ...props }) => {
  let ConsoleFeed = ConsoleFeedImport.get();
  let { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  let prefixCls = getPrefixCls('console', props.prefixCls);
  const [logs, setLogs] = useState<any>([]);
  console.log('ConsoleFeed', ConsoleFeed);

  // run once!
  useEffect(() => {
    let hookedConsole = ConsoleFeed.Hook(
      window.console,
      (log: any) => setLogs((currLogs: any) => [...currLogs, log]),
      false,
    );
    return () => ConsoleFeed.Unhook(hookedConsole);
  }, []);

  return (
    <div className={classnames(`${prefixCls}--content`, props.className)}>
      <ConsoleFeed.Console logs={logs} variant="light" />
    </div>
  );
};

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
}> = ({ ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  let prefixCls = getPrefixCls('console', props.prefixCls);
  let [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      className={classnames(`${prefixCls}`, {
        [`${prefixCls}--visible`]: visible,
      })}
    >
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
