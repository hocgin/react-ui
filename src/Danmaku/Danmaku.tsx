import React, {
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { ConfigProvider, Utils } from '@hocgin/ui';
import classnames from 'classnames';
import { useSize } from 'ahooks';

let DanmakuImport = Utils.Lang.dynamicImport(() => require('danmaku').default);

export type DanmakuOption = any;

export interface DanmakuFn {
  show: () => void;
  resize: () => void;
  hide: () => void;
  clear: () => void;
  danmaku: () => any;
}

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  danmakuRef?: MutableRefObject<DanmakuFn | undefined>;
  option?: DanmakuOption;
  children?: any;
  getInstance?: (_: any) => void;
}> = ({
        option,
        danmakuRef,
        className,
        getInstance,
        children = <div />,
        ...props
      }) => {
  let { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  let prefixCls = getPrefixCls('danmaku', props.prefixCls);
  let containerRef = useRef<HTMLDivElement>(null);
  let beContainerRef = useRef<HTMLDivElement>(null);
  const _danmakuRef = useRef<any>(null);
  let size = useSize(beContainerRef);

  useEffect(() => {
    let Danmaku = DanmakuImport.get();
    _danmakuRef.current = new Danmaku({
      container: containerRef.current,
      ...option,
    });

    if (getInstance && typeof getInstance === 'function') {
      getInstance(_danmakuRef.current);
    }
    return () => {
      _danmakuRef.current?.destroy();
    };
  }, [containerRef]);

  useEffect(() => {
    console.log('danmaku?.resize()', danmaku);
    _danmakuRef.current?.resize();
  }, [_danmakuRef, size]);

  let danmaku = _danmakuRef?.current;
  useImperativeHandle(
    danmakuRef,
    () =>
      ({
        show: danmaku?.show.bind(danmaku),
        resize: danmaku?.resize.bind(danmaku),
        hide: danmaku?.hide.bind(danmaku),
        clear: danmaku?.clear.bind(danmaku),
        danmaku: () => danmaku,
      } as DanmakuFn),
    [_danmakuRef.current],
  );

  return (
    <div className={classnames(`${prefixCls}`, className)}>
      <div
        ref={beContainerRef}
        className={classnames(`${prefixCls}--container`)}
      >
        {children}
      </div>
      <div
        ref={containerRef}
        className={classnames(`${prefixCls}--container-danmaku`)}
        style={{ height: size?.height, width: size?.width } as any}
      ></div>
    </div>
  );
};

export default Index;
