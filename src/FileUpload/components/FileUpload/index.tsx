import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Index: React.FC<{
  children?: any;
  headers?: any;
  action?: string;
  maxCount?: number;
  defaultFileList?: any[];
  onChange?: (info: any) => void;
}> = ({
  children = (
    <Button
      type="primary"
      shape="round"
      icon={<UploadOutlined />}
      size={'middle'}
    >
      上传
    </Button>
  ),
  headers = {},
  action = `/api/com/file/upload`,
  maxCount,
  defaultFileList,
  onChange,
  ...rest
}) => {
  return (
    <Upload
      name="file"
      progress={
        {
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
          format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
        } as any
      }
      defaultFileList={defaultFileList}
      maxCount={maxCount}
      action={action}
      headers={headers}
      onChange={onChange}
      {...rest}
    >
      {children}
    </Upload>
  );
};

export default Index;
