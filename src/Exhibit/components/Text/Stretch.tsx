import { Stretch as HStretch } from '@hocgin/ui';
import React from 'react';

export interface StretchProps {
  /**
   * 内容
   */
  children?: string | Node;
}

const Stretch: React.FC<StretchProps> = (props) => {
  return <HStretch>{props?.children}</HStretch>;
};

export default Stretch;
