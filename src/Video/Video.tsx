import React, { useEffect, useRef } from 'react';
import { LangKit } from '@/_utils';
import { ConfigContext } from '@/ConfigProvider';
import classnames from 'classnames';

let ArtplayerImport = LangKit.dynamicImport(
  () => require('artplayer').default,
);

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

  let { getPrefixCls } = React.useContext(ConfigContext);
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
