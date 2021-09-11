import React from 'react';
import { Upload, Button } from 'antd';
import { HttpRequestHeader } from '@/Utils/interface';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from 'antd/lib/upload/interface';

interface FileUploadProps {
  children?: string | Node;
  headers?: HttpRequestHeader;
  action?: string;
  maxCount?: number;
  defaultFileList?: any;
  onChange?: (info: any) => void;
}

interface FileUploadState {
}

class Index extends React.PureComponent<FileUploadProps, FileUploadState> {
  static defaultProps = {
    children: (
      <Button
        type='primary'
        shape='round'
        icon={<UploadOutlined />}
        size={'middle'}
      >
        上传
      </Button>
    ),
    headers: [],
    action: `/api/file/upload`,
  };

  render() {
    let { children, action, headers, defaultFileList, maxCount, onChange, ...rest } = this.props;
    return (
      <Upload
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
  }
}

export default Index;
