import React from 'react';
import { FileUpload, Utils } from '@hocgin/ui';

interface FileUploadProps {
  children?: string | Node;
  action?: string;
  maxCount?: number;
  value?: any;
  onChange?: (info: any) => void;
}

class Index extends React.PureComponent<FileUploadProps> {
  static defaultProps = {
    action: `/com/file/upload`,
    maxCount: 1,
  };
  state = {
    fileList: [],
  };

  render() {
    let { children, action, value, maxCount, ...rest } = this.props;
    return (
      <FileUpload
        maxCount={maxCount}
        action={`${action}`}
        defaultFileList={this.handleFileList(value)}
        {...rest}
        onChange={this.handleChange}>
        {children}
      </FileUpload>
    );
  }

  handleFileList = (values: any) => {
    if (Utils.Lang.isNull(values)) {
      return [];
    }
    if (values instanceof Array) {
      return (values || []).map(Utils.Ui.asFile);
    }
    return [Utils.Ui.asFile(values, 0)];
  };

  handleChange = ({ file, fileList }: any) => {
    let { onChange, maxCount } = this.props;
    fileList = fileList.map((file: any) => {
      let result = file.response;
      if (result) {
        // Component will show file.url as link
        if (Utils.Ui.showErrorMessageIfExits(result)) {
          file.url = result?.data;
        } else {
          file.status = 'error';
        }
      }
      return file;
    });
    this.setState({ fileList });
    let uploadFiles = fileList
      .filter(({ url }: any) => url)
      .map(({ url, name }: any) => ({ url, name }));
    onChange && onChange(maxCount === 1 ? uploadFiles[0] : uploadFiles);
  };
}

export default Index;
