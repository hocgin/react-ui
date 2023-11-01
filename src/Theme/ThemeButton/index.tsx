import React from 'react';
import { Button } from 'antd';
import { BulbOutlined, BulbTwoTone } from '@ant-design/icons';
import { ThemeStyle, useTheme } from '../useTheme';

export const ThemeButton: React.FC<{
  className?: string;
  type?: any;
  children?: string | JSX.Element;
}> = ({ type = 'text', ...props }) => {
  let [theme, { isDark, set: setTheme }] = useTheme();
  return (
    <Button
      type={type}
      onClick={() => setTheme?.(isDark ? ThemeStyle.light : ThemeStyle.dark)}
      icon={isDark ? <BulbTwoTone twoToneColor="#676767" /> : <BulbOutlined />}
    >
      {props?.children}
    </Button>
  );
};
