/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
export { default as Directory } from './Directory';
import OriginHtmlAnchor from './HtmlAnchor';
import { setDirectoryAnchor } from './HtmlAnchor';

type HtmlAnchorType = typeof OriginHtmlAnchor & {
  setDirectoryAnchor: typeof setDirectoryAnchor;
}

const HtmlAnchor = OriginHtmlAnchor as HtmlAnchorType;
HtmlAnchor.setDirectoryAnchor = setDirectoryAnchor;

export default HtmlAnchor;
