import React, { useEffect, useRef } from 'react';
import { ConfigProvider, Utils } from '@hocgin/ui';
import classnames from 'classnames';

let ArtplayerImport = Utils.Lang.dynamicImport(() => require('artplayer').default);

export type VideoOption = any;

const Index: React.FC<{
  prefixCls?: string;
  src?: string;
  className?: string;
  option?: VideoOption;
  getInstance?: (_: any) => void;
}> = ({ src, className, option = {}, getInstance, ...props }) => {
  const artRef = useRef<any>();

  useEffect(() => {
    let Artplayer = ArtplayerImport.get();
    const art = new Artplayer({
      theme: 'var(--video-color, red)',
      ...option,
      url: src ?? option?.url,
      container: artRef.current,
    });
    if (getInstance && typeof getInstance === 'function') {
      getInstance(art);
    }
    return () => {
      if (art && art.destroy) {
        art.destroy(false);
      }
    };
  }, []);

  let { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  let prefixCls = getPrefixCls('video', props.prefixCls);

  return (
    <>
      <div className={classnames(`${prefixCls}`, className)}>
        <div
          ref={artRef}
          className={classnames(`${prefixCls}-player`)}
          {...props}
        />
      </div>
    </>
  );
};
export default Index;
