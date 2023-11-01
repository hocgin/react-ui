'use client';

import React, { useEffect } from 'react';
import { App, ConfigProvider } from 'antd';

export { ThemeStyle, useTheme, setTheme } from './useTheme';
export { ThemeButton } from './ThemeButton';

import { useTheme } from './useTheme';
import { LangKit } from '@hocgin/hkit';

import type { ThemeConfig } from 'antd';
import { theme as AntdTheme } from 'antd';

export const Theme: React.FC<{
  children?: any;
}> = ({ children }) => {
  let [theme, { isDark }] = useTheme();
  useEffect(() => {
    if (!LangKit.isBrowser()) return;
    let element = document.querySelector('meta[name=theme-color]');
    if (!element) return;
    element.setAttribute('content', isDark ? '#1f1f1f' : '#fff');
  }, [isDark]);
  return (
    <>
      <ConfigProvider
        locale={require('antd/locale/zh_CN').default}
        theme={asTheme(isDark)}
      >
        <App style={{ height: '100%' }}>{children}</App>
      </ConfigProvider>
    </>
  );
};

export const withTheme = (node: JSX.Element) => <Theme>{node}</Theme>;

const { defaultAlgorithm, darkAlgorithm } = AntdTheme;

const lightTheme = {
  // fontSize: 16,
  colorPrimary: '#2B3036',
};
const darkTheme = {
  // fontSize: 16,
  colorPrimary: '#6b6b6b',
};
export const asTheme = (isDark: boolean = false) => {
  return {
    algorithm: isDark ? darkAlgorithm : defaultAlgorithm,
    token: isDark ? darkTheme : lightTheme,
  } as ThemeConfig;
};
