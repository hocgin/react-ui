import React from 'react';
import { Rich } from '@hocgin/ui';
import content from './Text';

export default () => {
  return (<Rich.Editor value={content} />);
};
