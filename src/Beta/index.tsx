/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import Request from './components/Request';
import N2Request from './components/N2Request';
import N3Request from './components/N3Request';

class Beta {
  static Request: typeof Request = Request;
  static N2Request: typeof N2Request = N2Request;
  static N3Request: typeof N3Request = N3Request;
}

export default Beta;
