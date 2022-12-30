import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { ConfigContext } from '@/ConfigProvider';
import { UAPILoader } from '@/_utils/map';
import { ClearOutlined } from '@ant-design/icons';
import { SearchLbsData } from '@/Promise/components/SearchLbs/types';
import { LangKit } from '@hocgin/hkit';

/**
 * 地图选点
 * 下拉输入文字搜索 点击弹窗选点
 * - https://github.com/ElemeFE/react-amap
 * - https://gitee.com/hocgin/HyWeixinMP
 * - https://github.com/uiwjs/react-amap
 * - https://uiw.gitee.io/react-amap/
 * - https://codesandbox.io/s/react-amap-issue-22-yt5wy-yt5wy?file=/src/App.js
 * - https://github.com/uiwjs/react-amap/issues/234
 * - https://www.npmjs.com/package/@amap/amap-jsapi-loader
 *
 * - https://lbs.amap.com/demo/amap-ui/demos/amap-ui-positionpicker/position-picker
 * @constructor
 */
const Index: React.FC<{
  prefixCls?: string;
  akay?: string;
  value?: SearchLbsData;
  onChange?: (value?: SearchLbsData) => void;
}> = ({ akay = 'a7a90e05a37d3f6bf76d4a9032fc9129', ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('SearchLbs', props?.prefixCls);
  let [data, setData] = useState<SearchLbsData | undefined>(props?.value);
  let [input, setInput] = useState<string>();
  useEffect(() => {
    setInput(data?.name);
    props?.onChange?.(data);
    console.log('目标位置调整', data);
  }, [data]);
  let LbsButton = React.lazy<any>(() =>
    LangKit.isBrowser()
      ? import('./LbsButton')
      : new Promise((resolve) => resolve({ default: <></> })),
  );
  let LbsSearch = React.lazy<any>(() =>
    LangKit.isBrowser()
      ? import('./LbsSearch')
      : new Promise((resolve) => resolve({ default: <></> })),
  );

  return (
    <Input.Group style={{ display: 'flex' } as any} compact>
      <UAPILoader useAMapUI={true} akay={akay}>
        <LbsSearch
          value={input}
          onChange={setInput}
          akay={akay}
          onSelect={setData}
        />
        <Button
          icon={<ClearOutlined />}
          onClick={setData.bind(this, undefined)}
        />
        <LbsButton
          prefixCls={`${prefixCls}-LbsButton`}
          data={data}
          onOk={setData}
          className={`${prefixCls}-LbsButton`}
          akay={akay}
        />
      </UAPILoader>
    </Input.Group>
  );
};

export default Index;
