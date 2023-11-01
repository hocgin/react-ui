import { useEffect, useState } from 'react';
import { LangKit } from '@hocgin/hkit';

export enum ThemeStyle {
  dark = 'dark',
  light = 'light',
  auto = 'auto',
}

const THEME_KEY = 'theme';

export const useTheme = () => {
  let darkScheme =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-color-scheme: dark)')
      : undefined;
  let onWatchTheme = (e) => setUseTheme(getTheme());
  let getTheme = () => {
    if (!LangKit.isBrowser()) {
      return ThemeStyle.auto;
    }
    let theme = localStorage.getItem(THEME_KEY) as ThemeStyle;
    return theme === ThemeStyle.auto
      ? darkScheme?.matches
        ? ThemeStyle.dark
        : ThemeStyle.light
      : theme;
  };
  let [useTheme, setUseTheme] = useState<ThemeStyle>(getTheme);
  let onChangeStorage = (e) => setUseTheme(getTheme());
  useEffect(() => {
    if (!LangKit.isBrowser()) return;
    darkScheme?.addEventListener?.('change', onWatchTheme);
    window.addEventListener('storage', onChangeStorage);
    return () => {
      darkScheme?.removeEventListener?.('change', onWatchTheme);
      window.removeEventListener('storage', onChangeStorage);
    };
  }, []);
  useEffect(() => {
    if (!LangKit.isBrowser()) return;
    document.documentElement.classList.remove(...Object.values(ThemeStyle));
    if (!document.documentElement.classList.contains(useTheme)) {
      document.documentElement.classList.add(useTheme);
    }
  }, [useTheme]);
  return [
    useTheme,
    {
      set: setTheme,
      isDark: useTheme === ThemeStyle.dark,
      setLight: () => setTheme(ThemeStyle.light),
      setDark: () => setTheme(ThemeStyle.dark),
      setAuto: () => setTheme(ThemeStyle.auto),
    },
  ] as const;
};

export async function setTheme(theme: ThemeStyle) {
  if (!LangKit.isBrowser()) return;
  localStorage.setItem(THEME_KEY, theme);
  window.dispatchEvent(new Event('storage'));
}
