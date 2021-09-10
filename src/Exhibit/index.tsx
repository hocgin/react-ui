import Enum from './components/Enum';
import DateTime from './components/DateTime';
import Number from './components/Number';
import Image from './components/Image';
import Link from './components/Link';
import Text from './components/Text';
import Array from './components/Array';
import React from 'react';

const Exhibit = class Exhibit extends React.Component<{}, {}> {
  static Text = Text;
  static Image = Image;
  static DateTime = DateTime;
  static Number = Number;
  static Enum = Enum;
  static Link = Link;
  static Array = Array;
};
export default Exhibit;
