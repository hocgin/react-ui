import React from 'react';
import { Rich } from '@hocgin/ui';
import content from './Text';

export default () => {
  return (<Rich.Editor value={content} onChange={(editorState: any) => {
    console.log(`rich html =>`, editorState.toHTML());
  }} />);
};
