import React, { useEffect, useState } from 'react';
import './index.css';
import { useInterval } from 'ahooks';

declare const google: any;

export const XTranslate = () => {
  let [deplay, setDeplay] = useState<number>(undefined);
  let elementId = 'google_translate_element';
  useInterval(() => {
    let element = document.getElementById(elementId);
    if (typeof google !== 'undefined' && element) {
      element.innerHTML = '';
      // var langName = navigator.language ? navigator.language.split('-')[0].toLowerCase() : 'en';
      let langName = 'zh-CN';
      let rs = new (google as any).translate.TranslateElement(
        {
          pageLanguage: langName,
          //0，原生select，并且谷歌logo显示在按钮下方。1，原生select，并且谷歌logo显示在右侧。2，完全展开语言列表，适合pc，
          layout: /mobile/i.test(navigator.userAgent) ? 0 : 2,
        },
        elementId,
      );
      setDeplay(undefined);
    }
  }, deplay);
  useEffect(() => {
    let scriptId = 'translate_google_js';
    if (typeof window !== 'undefined' && document.getElementById(scriptId)) {
      document.getElementById(scriptId).remove();
    }
    if (typeof window !== 'undefined' && !document.getElementById(scriptId)) {
      (window as any).GoogleTranslateElementInit = () => setDeplay(300);
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = scriptId;
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = `//cdn.hocgin.top/icons/gtranslate.js?&cb=GoogleTranslateElementInit`;
      script.onload = onload;
      script.onerror = console.warn;
      document.body.appendChild(script);
    }
  }, []);
  return <div id={elementId} />;
};

export const Translate = () => <XTranslate />;
