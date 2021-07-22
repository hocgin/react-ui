import React from 'react';
import Comment from './components/Comment';
import Editor from './components/Editor';
import Group from './components/Group';

let index: any = Comment;
index.Group = Group;
index.Editor = Editor;
export default index;
