import React, {useEffect, useRef, useState} from "react";
import {APILoader, AutoComplete} from '@uiw/react-amap';
import {Button, Input, Tooltip} from "antd";
import {SyncOutlined} from "@ant-design/icons";
import LbsButton from "./LbsButton";
import LbsSearch from "@/Promise/components/SearchLbs/LbsSearch";
import {ConfigContext} from "@/ConfigProvider";


/**
 * 地图选点
 * 下拉输入文字搜索 点击弹窗选点
 * - https://github.com/ElemeFE/react-amap
 * - https://gitee.com/hocgin/HyWeixinMP
 * - https://github.com/uiwjs/react-amap
 * - https://uiw.gitee.io/react-amap/
 * - https://codesandbox.io/s/react-amap-issue-22-yt5wy-yt5wy?file=/src/App.js
 * - https://github.com/uiwjs/react-amap/issues/234
 *
 * - https://lbs.amap.com/demo/amap-ui/demos/amap-ui-positionpicker/position-picker
 * @constructor
 */
const Index: React.FC<{ prefixCls?: string; }> = ({...props}) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('SearchLbs', props?.prefixCls);
  let akay = "a7a90e05a37d3f6bf76d4a9032fc9129";
  return <Input.Group style={{display: 'flex'} as any} compact>
    <APILoader akay={akay}>
      <LbsSearch akay={akay} />
      <LbsButton className={`${prefixCls}-LbsButton`} prefixCls={`${prefixCls}-LbsButton`} akay={akay} />
    </APILoader>
  </Input.Group>
}

export default Index;
