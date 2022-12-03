import OriginHeader from './components/Header';
import { TextLogo } from './components/Header';
import './style';

type HtmlType = typeof OriginHeader & {
  TextLogo: typeof TextLogo;
};

const Header = OriginHeader as HtmlType;
Header.TextLogo = TextLogo;

export default Header;
