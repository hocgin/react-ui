import React, {useEffect, useRef, useState} from 'react';
import classnames from 'classnames';
import {Button, Modal, Tooltip} from "antd";
import {SyncOutlined} from "@ant-design/icons";
import {APILoader, Map, Marker, useMapContext} from "@uiw/react-amap";
import LbsSearch, {AutoCompleteEventsCallback} from "./LbsSearch";
import {useLatest} from "ahooks";

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  onOk?: (data: AutoCompleteEventsCallback) => void;
  akay?: string;
}> = ({...props}) => {
  let prefixCls = props.prefixCls;
  const mapRef = useRef<any>();
  let [center, setCenter] = useState<AMap.LngLat>();

  let [data, setData] = useState<AutoCompleteEventsCallback>();
  let [visible, setVisible] = useState(false);
  return <>
    <Tooltip title="选择点">
      <Button icon={<SyncOutlined />} onClick={setVisible.bind(this, true)} />
    </Tooltip>
    <Modal className={classnames(`${prefixCls}`, props?.className)}
           closable={false}
           onOk={() => data && props?.onOk?.(data)}
           onCancel={setVisible.bind(this, false)}
           visible={visible}>
      <div style={{width: '100%', height: 300}}>
        <LbsSearch onSelect={setData} className={`${prefixCls}-LbsSearch`} akay={props?.akay} />
        <APILoader akay={props?.akay}>
          <Map ref={mapRef} zoom={12}
               onComplete={() => setCenter(mapRef.current.map.getCenter())}
               onDragStart={() => setCenter(mapRef.current.map.getCenter())}
               onDragging={() => setCenter(mapRef.current.map.getCenter())}
               onDragEnd={() => setCenter(mapRef.current.map.getCenter())}>
            {center && <Marker visible={true} position={center}
                               animation={'AMAP_ANIMATION_DROP'}
                               icon={new AMap.Icon({
                                 imageSize: new AMap.Size(25, 34),
                                 image: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-1.png'
                               })} />}
          </Map>
        </APILoader>
      </div>
    </Modal>
  </>;
};

export default Index;
