import React, { useEffect, useRef } from 'react';
import { ConfigProvider, Utils } from '@hocgin/ui';
import classnames from 'classnames';

let AplayerImport = Utils.Lang.dynamicImport(() => {
  require('aplayer/dist/APlayer.min.css');
  return require('aplayer');
});


export type AudioOption = any;

const getName4Url = (url: string): string | undefined => {
  return `${url}`.split('/').pop();
};

const srcToAudio = (src: any): any[] => {
  if (Array.isArray(src) && src.length > 0) {
    if (typeof src[0] === 'string') {
      return src.map((item: string) => {
        return {
          name: getName4Url(item),
          url: item,
        };
      });
    } else if (typeof src[0] === 'object') {
      return src;
    }
  } else if (typeof src === 'string') {
    return [
      {
        name: getName4Url(src as string),
        url: src,
      },
    ];
  }
  return [];
};

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  src: string | string[] | any[];
  option?: AudioOption;
  getInstance?: (_: any) => void;
}> = ({ option, src, getInstance, ...props }) => {
  const playerRef = useRef<any>({});
  useEffect(() => {
    let APlayer = AplayerImport.get();
    const art = new APlayer({
      theme: 'var(--video-color, #0000000f)',
      ...option,
      audio: option.audio ?? srcToAudio(src),
      container: playerRef.current,
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
  let prefixCls = getPrefixCls('audio', props.prefixCls);
  return (
    <div className={classnames(`${prefixCls}`)}>
      <div
        ref={playerRef}
        className={classnames(`${prefixCls}-player`)}
        {...props}
      />
    </div>
  );
};

export default Index;
