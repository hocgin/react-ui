import OriginHeader from './components/Header';
import { TextLogo } from './components/Header';

type HtmlType = typeof OriginHeader & {
  TextLogo: typeof TextLogo;
};

const Header = OriginHeader as HtmlType;
Header.TextLogo = TextLogo;

export default Header;
