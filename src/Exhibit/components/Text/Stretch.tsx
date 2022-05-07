import { Stretch as HStretch } from '@/index';
import React from 'react';

export interface StretchProps {
  fullSize?: boolean;
  maxRow?: number;
  children?: any;
}

const Stretch: React.FC<StretchProps> = ({ children, ...rest }) => {
  return <HStretch {...rest}>{children}</HStretch>;
};

export default Stretch;
