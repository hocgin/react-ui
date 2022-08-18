import React from 'react';
import { ConfigContext } from '@/ConfigProvider';
import classnames from 'classnames';
import Directory from './Directory';
import Utils from '@/Utils';

/**
 * <pre>
 * in: <h1>你好</h1> out: <h1 id="你好">你好</h1>
 * in: <h1>你好 星期五</h1> out: <h1 id="你好-星期五">你好</h1>
 * </pre>
 * @param content
 */
export const setDirectoryAnchor = (content?: string) => {
  if (!content) {
    return content;
  }

  let head = Utils.Lang.matchHtmlTag(content, 'h[1-6]');
  head.forEach((item) => {
    let newHtml = item.html.replace(
      `<${item.name}`,
      `<${item.name} id="${item.key}" `,
    );
    content = `${content}`.replace(item.html, newHtml);
  });
  return content;
};

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  content?: string;
}> = ({ ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('html-anchor', props.prefixCls);
  return (
    <div className={classnames(`${prefixCls}`)}>
      <Directory content={`${props?.content}`} />
    </div>
  );
};

export default Index;
