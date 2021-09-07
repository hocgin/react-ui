import React from 'react';
import { Upload } from 'antd';
import { HttpRequestHeader } from '@/Utils/interface';

interface FileUploadProps {
  headers?: HttpRequestHeader,
  action?: string,
}

interface FileUploadState {
}

class Index extends React.PureComponent<FileUploadProps, FileUploadState> {
  private static defaultProps = {
    children: <></>,
    headers: [],
    action: `/api/file/upload`,
  };

  render() {
    let { children, action, headers, ...rest } = this.props;
    return (<Upload {...rest} action={action} headers={headers}>
      {children}
    </Upload>);
  }

}

export default Index;
