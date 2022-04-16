import React from 'react';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FileInfo } from '@/Utils/interface';
import { Dom, Utils } from '@/index';
import 'antd/es/upload/style';

let defaultChildren = <><Button
  type='primary'
  shape='round'
  icon={<UploadOutlined />}
  size={'middle'}
>
  上传
</Button></>;
const Index: React.FC<{
  children?: any;
  headers?: any;
  action?: string;
  maxCount?: number;
  beforeUpload?: (file: any, FileList: any) => boolean;
  value?: FileInfo | FileInfo[];
  onChange?: (info: FileInfo | FileInfo[]) => void;
}> = ({
        children = defaultChildren,
        beforeUpload,
        headers,
        action = `/api/com/file/upload`,
        maxCount,
        value,
        onChange,
        ...rest
      }) => {
  let handleChange = ({ fileList }: any) => {
    fileList = fileList.map((file: any) => {
      let result = file?.response;
      if (result) {
        // Component will show file.url as link
        if (Dom.showErrorMessageIfExits(result)) {
          file.url = result.data;
        } else {
          file.status = 'error';
        }
      }
      return file;
    });
    let newFileList = fileList.filter(({ url }: any) => url).map(Dom.asServerFile);
    onChange?.(maxCount === 1 ? newFileList[0] : newFileList);
  };
  let handleFileList = (values: any): any => {
    if (Utils.Lang.isNull(values)) {
      return [];
    }
    if (values instanceof Array) {
      return (values || []).map(Dom.asFile);
    }
    return [Dom.asFile(values, 0)];
  };

  let progress = {
    strokeColor: {
      '0%': '#108ee9',
      '100%': '#87d068',
    },
    strokeWidth: 3,
    format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
  };
  return (
    <Upload
      name='file'
      beforeUpload={beforeUpload}
      progress={progress}
      defaultFileList={handleFileList(value)}
      maxCount={maxCount}
      action={action}
      headers={headers}
      onChange={handleChange}
      {...rest}
    >
      {children}
    </Upload>
  );
};

export default Index;
