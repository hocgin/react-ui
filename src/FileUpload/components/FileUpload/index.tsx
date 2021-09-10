import React from 'react';
import { Upload, Button } from 'antd';
import { HttpRequestHeader } from '@/Utils/interface';
import { UploadOutlined } from '@ant-design/icons';

interface FileUploadProps {
  children?: string | Node;
  headers?: HttpRequestHeader;
  action?: string;
}

interface FileUploadState {}

class Index extends React.PureComponent<FileUploadProps, FileUploadState> {
  static defaultProps = {
    children: (
      <Button
        type="primary"
        shape="round"
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
    let { children, action, headers, ...rest } = this.props;
    return (
      <Upload {...rest} action={action} headers={headers}>
        {children}
      </Upload>
    );
  }
}

export default Index;
