import React from 'react';
import { Markdown } from '@hocgin/ui';
import content from './Text';

export default () => {
  return <Markdown.Preview>{content}</Markdown.Preview>;
};
