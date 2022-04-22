import React from 'react';
import { Comment } from '@/index';
import useAction from './use_action';

const Index: React.FC<{
  refType: any;
  refId: any;
  total?: number;
}> = ({ total, refType, refId }) => {
  return <Comment total={total} useAction={useAction(refType, refId)} />;
};

export default Index;
