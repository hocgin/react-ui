import React, { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { Button, Modal, Tooltip } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import { Map } from '@uiw/react-amap';
import LbsSearch from './LbsSearch';
import { UAPILoader } from '@/_utils/map';
import { SearchLbsData } from '@/Promise/components/SearchLbs/types';

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  data?: SearchLbsData;
  onOk?: (data: SearchLbsData) => void;
  akay?: string;
}> = ({ ...props }) => {
  let prefixCls = props.prefixCls;
  const mapRef = useRef<any>();
  let [data, setData] = useState<SearchLbsData | undefined>(props?.data);
  let [visible, setVisible] = useState(false);
  let [input, setInput] = useState<string>();
  useEffect(() => {
    setData(props?.data);
  }, [props.data]);

  useEffect(() => {
    setInput(data?.name);
    updateMapCenter();
  }, [data]);

  let updateMapCenter = (sData?: SearchLbsData) => {
    let map = mapRef?.current?.map;
    let nData = sData ?? data;
    if (nData && nData?.location && map) {
      map.setCenter(nData?.location);
    }
  };

  return (
    <>
      <Tooltip title="选择点">
        <Button icon={<AimOutlined />} onClick={setVisible.bind(this, true)} />
      </Tooltip>
      <Modal
        className={classnames(`${prefixCls}`, props?.className)}
        closable={false}
        onOk={() => {
          data && props?.onOk?.(data);
          setVisible(false);
        }}
        onCancel={setVisible.bind(this, false)}
        open={visible}
      >
        <div style={{ width: '100%', height: 300 }}>
          <LbsSearch
            value={input}
            onChange={setInput}
            onSelect={(data) => {
              let map = mapRef?.current?.map;
              setData(data);
              map.setCenter(data?.location);
            }}
            className={`${prefixCls}-LbsSearch`}
            akay={props?.akay}
          />
          <UAPILoader useAMapUI={true} akay={props?.akay}>
            <Map
              ref={mapRef}
              zoom={12}
              onComplete={() => {
                let map = mapRef?.current?.map;
                updateMapCenter();
                AMapUI.loadUI(
                  ['misc/PositionPicker'],
                  (PositionPicker: any) => {
                    let positionPicker = new PositionPicker({
                      mode: 'dragMap',
                      map: map,
                    });
                    positionPicker.on('success', (result: any) => {
                      let regeocode = result?.regeocode;
                      let aois = regeocode?.aois?.[0];
                      console.log('result', result);
                      let name = aois?.name ?? result?.nearestPOI;
                      let address = regeocode?.formattedAddress;
                      let adcode = regeocode?.addressComponent?.adcode;
                      let location = result?.position;
                      setData({ name, address, adcode, location });
                    });
                    positionPicker.start();
                  },
                );
              }}
            />
          </UAPILoader>
        </div>
      </Modal>
    </>
  );
};

export default Index;
