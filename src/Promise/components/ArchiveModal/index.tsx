import React from 'react';
import { Button, message, Modal } from 'antd';
import { Config } from '@/Utils/config';
import { Utils, Archive } from '@hocgin/ui';
import { Result } from '@/Utils/interface';
import { ArchiveColumn } from '@/Archive/components/interface';

interface ArchiveProps {
  /**
   * 信息唯一标记
   */
  id?: string | number;
  /**
   * 请求地址
   */
  action: string;
  /**
   * 定义
   */
  columns?: ArchiveColumn[];
  /**
   * 可见性
   */
  visible?: boolean;
  /**
   * 标题
   */
  title?: string;
  /**
   * 关闭
   */
  onClose?: () => void;
}

class Index extends React.PureComponent<ArchiveProps> {
  formRef: any = React.createRef();
  static defaultProps = {};
  state = {
    id: null,
    submitLoading: false,
    getLoading: false,
    data: {},
  };

  componentDidMount() {
    this.get();
  }

  render() {
    let { columns, visible, onClose, title } = this.props;
    let { data } = this.state;
    return (
      <Modal
        width={640}
        title={title}
        visible={visible}
        onCancel={onClose}
        bodyStyle={{ padding: '32px 40px 48px' }}
        footer={this.renderFooter()}
        maskClosable
      >
        <Archive columns={columns} formRef={this.formRef} />
      </Modal>
    );
  }

  submit = (values: any) => {
    console.log('va', values);
    let { id } = this.props;
    const isUpdate = id !== null;
    this.setState({ submitLoading: true }, () => {
      let url = isUpdate ? this.putUrl : this.postUrl;
      Utils.POST(`${url}`, { ...values })
        .then((result: Result) => {
          if (Utils.Ui.showErrorMessageIfExits(result)) {
            return;
          }
        })
        .finally(() => this.setState({ submitLoading: false }));
    });
  };

  get = () => {
    let { id } = this.props;
    if (!id) return;
    this.setState({ getLoading: true }, () => {
      Utils.POST(`${this.getUrl}`, {})
        .then((result: Result) => {
          if (Utils.Ui.showErrorMessageIfExits(result)) {
            return;
          }
        })
        .finally(() => this.setState({ getLoading: false }));
    });
  };

  renderFooter = () => {
    let { submitLoading } = this.state;
    return [
      <Button key="cancel" htmlType="button">
        取消
      </Button>,
      <Button
        onClick={this.onSubmit}
        loading={submitLoading}
        key="submit"
        htmlType="button"
        type="primary"
      >
        完成
      </Button>,
    ];
  };

  onSubmit = () => {
    console.log(
      ' this.formRef?.current',
      this.formRef?.current.getFieldsValue(),
    );
    this.formRef?.current
      .validateFields()
      .then((values: any) => this.submit({ ...values?.data, ...values }))
      .catch((err: any) => message.error(Utils.Ui.getErrorMessage(err)));
  };

  get postUrl() {
    let { action } = this.props;
    return `${Config.getBaseServerUrl()}${action}`;
  }

  get getUrl() {
    let { action, id } = this.props;
    return `${Config.getBaseServerUrl()}${action}/${id}`;
  }

  get putUrl() {
    return this.getUrl;
  }
}

export default Index;
