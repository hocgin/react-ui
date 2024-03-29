import React, { useState } from 'react';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UIKit } from '@/_utils';
import { FileInfo, HttpRequestHeader } from '@/_types';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

const Index: React.FC<{
  headers?: HttpRequestHeader;
  action?: string;
  name?: string;
  accept?: string;
  maxCount?: number;
  beforeUpload?: (file: any, FileList: any) => boolean;
  value?: FileInfo[];
  onChange?: (values: FileInfo[]) => void;
}> = ({
        action = '/api/com/file/upload',
        beforeUpload,
        name,
        accept,
        value,
        headers,
        maxCount = 100,
        onChange,
      }) => {
  let [previewVisible, setPreviewVisible] = useState<boolean>(false);
  let [fileList, setFileList] = useState<FileInfo[]>(value || []);
  let [previewImage, setPreviewImage] = useState<string | undefined>(undefined);

  let handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewVisible(true);
    setPreviewImage(file.url || file.preview);
  };

  let handleChange = ({ file, fileList }: any) => {
    fileList = fileList.map((file: any) => {
      let result = file?.response;
      if (result) {
        // Component will show file.url as link
        if (UIKit.showErrorMessageIfExits(result)) {
          file.url = result.data;
        } else {
          file.status = 'error';
        }
      }
      return file;
    });
    let newFileList = fileList
      .filter(({ url }: any) => url)
      .map(UIKit.asServerFile);
    setFileList(newFileList);
    onChange?.(newFileList);
  };

  return (
    <div>
      <Upload
        name={name}
        accept={accept}
        action={action}
        headers={headers}
        beforeUpload={beforeUpload}
        defaultFileList={(value || []).map(UIKit.asFile) as any}
        listType='picture-card'
        onPreview={handlePreview}
        maxCount={maxCount}
        onChange={handleChange}
      >
        {fileList.length >= maxCount ? null : (
          <div>
            <PlusOutlined />
            <div>上传</div>
          </div>
        )}
      </Upload>
      <Modal
        open={previewVisible}
        footer={null}
        onCancel={setPreviewVisible.bind(this, false)}
      >
        <img
          style={{ width: '100%' } as any}
          src={previewImage || ''}
          alt={'图片'}
        />
      </Modal>
    </div>
  );
};

export default Index;
