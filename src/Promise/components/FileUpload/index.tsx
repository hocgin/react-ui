import React from 'react';
import { FileUpload } from '@/index';
import { FileInfo } from '@/Utils/interface';

const Index: React.FC<{
  children?: any;
  action?: string;
  maxCount?: number;
  value?: FileInfo | FileInfo[];
  onChange?: (info: any) => void;
}> = ({ children, action, value, maxCount = 1, onChange, ...rest }) => {
  return (
    <FileUpload
      maxCount={maxCount}
      action={`${action}`}
      value={value}
      {...rest}
      onChange={onChange}
    >
      {children}
    </FileUpload>
  );
};

export default Index;
