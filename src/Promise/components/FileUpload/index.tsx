import React from 'react';
import { Config } from '@/Utils/config';
import { FileUpload } from '@hocgin/ui';

interface FileUploadProps {
  children?: string | Node;
  action?: string;
}

class Index extends React.PureComponent<FileUploadProps> {
  static defaultProps = {
    action: `/com/file/upload`,
  };

  render() {
    let { children, action } = this.props;
    return (
      <FileUpload
        action={`${Config.getBaseServerUrl()}${action}`}
        headers={Config.getHeaders()}
      >
        {children}
      </FileUpload>
    );
  }
}

export default Index;
