import * as React from 'react';
import { Editor } from '@tiptap/react';
import { Dom } from '@/index';
import TbButton from '@/Editor/components/TbButton';
import styles from '@/Editor/components/Editor/action.less';
import { Upload } from 'antd';
import { PictureOutlined } from '@ant-design/icons';

export const UploadImage: React.FC<{ editor?: Editor | null }> = ({
                                                                    editor,
                                                                  }) => {
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
    if (fileList.length >= 1 && fileList[0]?.url) {
      let src = fileList[0]?.url;
      editor?.chain().focus().setImage({ src: src }).run();
    }
  };
  return (
    <TbButton title='图片' className={styles.uploadImage}>
      <Upload
        accept={'image/*'}
        withCredentials
        name='file'
        maxCount={1}
        action={'/api/com/file/upload'}
        headers={{}}
        onChange={handleChange}
      >
        <PictureOutlined />
      </Upload>
    </TbButton>
  );
};
