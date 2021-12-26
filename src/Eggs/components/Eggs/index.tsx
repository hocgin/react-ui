import React, { useEffect, useRef, useState } from 'react';
import { Utils, Snow } from '@hocgin/ui';
import { useMount, useUpdateEffect, useDocumentVisibility } from 'ahooks';

const failure: string = 'http://cdn.hocgin.top/file/failure.ico';
const favicon: string = 'http://cdn.hocgin.top/file/favicon.ico';

const Index: React.FC<{
  children?: string;
  csl?: boolean;
  doc?: boolean;
}> = ({ csl = true, doc = true, children }, ref) => {
  if (Utils.Lang.isServer()) {
    return <></>;
  }
  let documentVisibility = useDocumentVisibility();
  let [title, setTitle] = useState('');
  useMount(() => {
    setTitle(document?.title);
    // ====> 文字彩蛋
    let hours = [
      '🕐',
      '🕑',
      '🕒',
      '🕓',
      '🕔',
      '🕕',
      '🕖',
      '🕗',
      '🕘',
      '🕙',
      '🕚',
      '🕛',
      '🕜',
      '🕝',
      '🕞',
      '🕟',
      '🕠',
      '🕡',
      '🕢',
      '🕣',
      '🕤',
      '🕥',
      '🕦',
      '🕧',
    ];
    let date = new Date();
    let location = window?.location;

    let text = `${hours[date.getHours()]} ${date}
   _                     _
  | |__   ___   ___ __ _(_)_ __
  | '_ \\ / _ \\ / __/ _\` | | '_ \\
  | | | | (_) | (_| (_| | | | | |
  |_| |_|\\___/ \\___\\__, |_|_| |_|
                   |___/
>> ${location.protocol}//${location.hostname}${
      location.port ? `:${location.port}` : ''
    }`;
    let commentEl = document.createComment(text);
    document.insertBefore(commentEl, document.documentElement);

    // ====> 图标彩蛋
    if (csl) {
      console.log(
        '\n %c HOCGIN %c https://hocg.in \n\n',
        'color: #fff; background: #030307; padding:5px 0;',
        'background: #fadfa3; padding:5px 0;',
      );
    }
  });
  useUpdateEffect(() => {
    if (!doc) {
      return;
    }
    let flag;
    let link = getIcon();
    if (documentVisibility === 'hidden') {
      link.href = failure;
      document.title = '崩溃啦！';
      clearTimeout(flag);
    } else {
      link.href = favicon;
      document.title = `又好了！${title}`;
      flag = setTimeout(() => (document.title = title), 2e3);
    }
  }, [documentVisibility]);

  let getIcon = () => {
    let link: any = document.querySelector("link[rel*='icon']");
    if (link === null) {
      link = document.createElement('link');
      link.type = 'image/x-icon';
      link.rel = 'shortcut icon';
      link.href = favicon;
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    return link;
  };

  // 12、1 月，雪花特效
  let isShowSnow = [12, 1].includes(new Date().getMonth() + 1);
  return (
    <>
      <Snow isShow={isShowSnow}>{children}</Snow>
    </>
  );
};

export default Index;
