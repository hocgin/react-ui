import OriginHeader from './components/Header/header';
import { TextLogo } from './components/Header/header';
import './style';

type HtmlType = typeof OriginHeader & {
  TextLogo: typeof TextLogo;
};

const Header = OriginHeader as HtmlType;
Header.TextLogo = TextLogo;

export default Header;
