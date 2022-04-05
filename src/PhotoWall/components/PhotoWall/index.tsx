import React, { useState } from 'react';
import { message, Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Dom } from '@hocgin/ui';
import { FileInfo, HttpRequestHeader } from '@/Utils/interface';

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
  accept?: string;
  maxLength?: number;
  beforeUpload?: (file: any, FileList: any) => boolean;
  value?: FileInfo[];
  onChange?: (values: FileInfo[]) => void;
}> = ({
  action = '/api/com/file/upload',
  beforeUpload,
  accept,
  value,
  headers,
  maxLength = 100,
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
        if (Dom.showErrorMessageIfExits(result)) {
          file.url = result.data;
        } else {
          file.status = 'error';
        }
      }
      return file;
    });
    let newFileList = fileList
      .filter(({ url }: any) => url)
      .map(Dom.asServerFile);
    setFileList(newFileList);
    onChange?.(newFileList);
  };

  return (
    <div>
      <Upload
        accept={accept}
        action={action}
        headers={headers}
        beforeUpload={beforeUpload}
        defaultFileList={(value || []).map(Dom.asFile) as any}
        listType="picture-card"
        onPreview={handlePreview}
        maxCount={maxLength}
        onChange={handleChange}
      >
        {fileList.length >= maxLength ? null : (
          <div>
            <PlusOutlined />
            <div>上传</div>
          </div>
        )}
      </Upload>
      <Modal
        visible={previewVisible}
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
