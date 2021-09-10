import React from 'react';
import { TreeSelect } from 'antd';
import { Config } from '@/Utils/config';
import { Utils } from '@hocgin/ui';
import { Result } from '@/Utils/interface';

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
  };
  state = {
    data: [],
  };

  render() {
    let { multiple, placeholder } = this.props;
    let { data } = this.state;
    return (
      <TreeSelect
        allowClear
        treeCheckable
        multiple={multiple}
        placeholder={placeholder}
      >
        {Utils.Ui.renderTreeSelectNodes(data)}
      </TreeSelect>
    );
  }

  componentDidMount() {
    Utils.POST(`${this.url}`, {}).then((result: Result) => {
      if (Utils.Ui.showErrorMessageIfExits(result)) {
        this.setState({ data: result?.data });
        return;
      }
    });
  }

  get url() {
    let { action } = this.props;
    return `${Config.getBaseServerUrl()}${action}`;
  }
}

export default Index;
