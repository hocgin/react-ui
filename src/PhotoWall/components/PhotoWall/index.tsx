import React from 'react';
import { Modal, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Utils } from '@hocgin/ui';
import { HttpRequestHeader } from '@/Utils/interface';
import { UploadFile } from 'antd/lib/upload/interface';

function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

interface PhotoWallProps {
  headers?: HttpRequestHeader,
  action?: string,
  maxLength: number,
  onChange?: (values: []) => void,
  defaultFileList?: Array<UploadFile>,
}

interface PhotoWallState {
}


class Index extends React.Component<PhotoWallProps, PhotoWallState> {
  private static defaultProps = {
    maxLength: 1000,
    defaultFileList: [],
    onChange: (values = []) => {
    },
  };
  state = {
    previewVisible: false,
    previewImage: null,
    fileList: [],
  };

  render() {
    let { maxLength, defaultFileList, headers, action } = this.props;
    let { previewVisible, fileList, previewImage } = this.state;
    const uploadButton = (<div>
      <PlusOutlined />
      <div>上传</div>
    </div>);
    return (
      <div>
        <Upload action={action}
                headers={headers}
                defaultFileList={defaultFileList}
                listType='picture-card'
                onPreview={this.handlePreview}
                onChange={this.handleChange}>
          {fileList.length >= maxLength ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img style={{ width: '100%' }} src={previewImage || ''} alt={'图片'} />
        </Modal>
      </div>
    );
  }

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ file, fileList }: any) => {
    let { onChange } = this.props;
    fileList = fileList.map((file: any) => {
      let result = file.response;
      if (result) {
        // Component will show file.url as link
        if (Utils.Ui.showErrorMessageIfExits(result)) {
          file.url = result.data;
        } else {
          file.status = 'error';
        }
      }
      return file;
    });
    this.setState({ fileList });
    onChange && onChange(fileList.filter(({ url }: any) => url).map(({ url, name }: any) => ({ url, name })));
  };

  handleCancel = () => this.setState({ previewVisible: false });

}

export default Index;
