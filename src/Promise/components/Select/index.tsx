import React from 'react';
import { Select } from 'antd';
import { Option } from '@/Archive/components/interface';
import Service from './service';
import { Utils } from '@hocgin/ui';

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
    let { multiple, placeholder, action, ...rest } = this.props;
    let { data } = this.state;
    let style = { minWidth: '5em' };

    return (
      <Select
        allowClear
        style={style}
        mode={multiple ? 'multiple' : undefined}
        placeholder={placeholder}
        {...rest}
      >
        {(data || []).map(({ key, value }: Option) => (
          <Select.Option key={`${value}`} value={value}>
            {key}
          </Select.Option>
        ))}
      </Select>
    );
  }

  componentDidMount() {
    this.initialValues();
  }

  initialValues() {
    let { action } = this.props;
    if (action) {
      Service.initialValues(action).then((result) => {
        if (Utils.Ui.isSuccess(result)) {
          this.setState({ data: result?.data });
        }
      });
    }
  }
}

export default Index;
