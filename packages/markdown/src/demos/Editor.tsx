import React from 'react';
import Markdown from '@hocgin/gin-markdown';
import content from './Text';

export default () => {
  return <Markdown.Editor value={content} height={200} />;
};
