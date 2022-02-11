import React from 'react';
import { FileUpload, Utils, Dom } from '@hocgin/ui';
import { FileInfo } from '@/Utils/interface';

const Index: React.FC<{
  children?: any;
  action?: string;
  maxCount?: number;
  value?: FileInfo | FileInfo[];
  onChange?: (info: any) => void;
}> = ({
  children,
  action = `/com/file/upload`,
  value,
  maxCount = 1,
  onChange,
  ...rest
}) => {
  let [fileList, setFileList] = React.useState([]);
  let handleChange = ({ file, fileList }: any) => {
    fileList = fileList.map((file: any) => {
      let result = file.response;
      if (result) {
        // Component will show file.url as link
        if (Dom.showErrorMessageIfExits(result)) {
          file.url = result?.data;
        } else {
          file.status = 'error';
        }
      }
      return file;
    });
    setFileList(fileList);
    let uploadFiles = fileList
      .filter(({ url }: any) => url)
      .map(({ url, name }: any) => ({ url, filename: name }));
    onChange && onChange(maxCount === 1 ? uploadFiles[0] : uploadFiles);
  };

  let handleFileList = (values: any) => {
    if (Utils.Lang.isNull(values)) {
      return [];
    }
    if (values instanceof Array) {
      return (values || []).map(Dom.asFile);
    }
    return [Dom.asFile(values, 0)];
  };

  return (
    <FileUpload
      maxCount={maxCount}
      action={`${action}`}
      defaultFileList={handleFileList(value)}
      {...rest}
      onChange={handleChange}
    >
      {children}
    </FileUpload>
  );
};

export default Index;
