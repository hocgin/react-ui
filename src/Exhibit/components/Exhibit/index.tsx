import React from 'react';
import type Enum from '../Enum';
import type DateTime from '../DateTime';
import type Number from '../Number';
import type Image from '../Image';
import type Link from '../Link';
import type Text from '../Text';
import type Array from '../Array';
import Field, { ProFieldPropsType } from '@ant-design/pro-field';

type ExhibitType = 'pro-antd' | 'react-ui';

export interface ExhibitProps extends ProFieldPropsType {
  /**
   * 渲染模式
   */
  type?: ExhibitType;
}

class Exhibit extends React.Component<ExhibitProps> {
  static Text: typeof Text;
  static Image: typeof Image;
  static DateTime: typeof DateTime;
  static Number: typeof Number;
  static Enum: typeof Enum;
  static Link: typeof Link;
  static Array: typeof Array;
  static defaultProps = {
    type: 'pro-antd',
    mode: 'read',
  };

  render() {
    let { type } = this.props;
    if (type === 'react-ui') {
      return <></>;
    } else {
      let {
        text,
        valueType,
        request,
        valueEnum,
        mode,
        renderFormItem,
        render,
      } = this.props;
      return (
        <Field
          text={text}
          request={request}
          renderFormItem={renderFormItem}
          render={render}
          valueEnum={valueEnum}
          valueType={valueType}
          mode={mode}
        />
      );
    }
  }
}

export default Exhibit;
