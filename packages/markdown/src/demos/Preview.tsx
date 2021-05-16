import React from 'react';
import Markdown from '@hocgin/gin-markdown';
import content from './Text';

export default () => {
  return <Markdown.Preview>{content}</Markdown.Preview>;
};
