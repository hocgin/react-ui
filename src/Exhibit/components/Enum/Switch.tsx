import React from 'react';
import Status, { ColorMap } from './Status';

export interface SwitchProps {
  value?: string | boolean | number;
  title?: string;
}

const Switch: React.FC<SwitchProps> = ({ value, title }: SwitchProps) => {
  let on = ['on', '1', 'true'];
  let off = ['off', '0', 'false'];
  let colorMaps: ColorMap = {};
  on.forEach((v) => (colorMaps[v] = '#87d068'));
  off.forEach((v) => (colorMaps[v] = '#f50'));
  return (
    <Status
      colorMaps={colorMaps}
      value={value}
      title={title || (on.includes(`${value}`) ? '开启' : '关闭')}
    />
  );
};

export default Switch;
