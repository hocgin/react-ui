import React from 'react';
import { TreeSelect } from 'antd';
import { Utils } from '@hocgin/ui';
import Service from '@/Promise/components/Select/service';

interface TreeSelectProps {
  /**
   * 请求地址
   */
  action: string;
  /**
   * 是否多选
   */
  multiple?: boolean;
  /**
   * 选择提示
   */
  placeholder?: string;
}

class Index extends React.PureComponent<TreeSelectProps> {
  static defaultProps = {
    multiple: false,
    placeholder: '请选择',
  };
  state = {
    data: [],
  };

  render() {
    let { multiple, placeholder, ...rest } = this.props;
    let { data } = this.state;
    return (
      <TreeSelect
        allowClear
        treeCheckable={multiple}
        multiple={multiple}
        placeholder={placeholder}
        {...rest}
      >
        {Utils.Ui.renderTreeSelectNodes(data)}
      </TreeSelect>
    );
  }

  componentDidMount() {
    this.initialValues();
  }

  async initialValues() {
    let { action } = this.props;
    Service.initialValues(action).then((result) => {
      if (Utils.Ui.isSuccess(result)) {
        this.setState({ data: result?.data });
      }
    });
  }
}

export default Index;
