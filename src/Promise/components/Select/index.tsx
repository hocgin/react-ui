import React from 'react';
import { Select } from 'antd';
import { Config } from '@/Utils/config';
import { Utils } from '@hocgin/ui';
import { Result } from '@/Utils/interface';
import { Option } from '@/Archive/components/interface';

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
      <Select
        allowClear
        mode={multiple ? 'multiple' : undefined}
        placeholder={placeholder}
      >
        {data.map(({ key, value }: Option) => (
          <Select.Option value={value}>{key}</Select.Option>
        ))}
      </Select>
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
