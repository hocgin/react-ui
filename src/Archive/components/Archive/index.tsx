import React from 'react';
import styles from './index.less';
import { Form } from 'antd';
import type { ArchiveColumn } from '../interface';
import ArchiveItem from '../ArchiveItem';
import classnames from 'classnames';

export interface ArchiveProps {
  /**
   * 设置样式名
   */
  className?: string;
  /**
   * 定义
   */
  columns?: ArchiveColumn[];
  /**
   * 初始化值
   */
  initialValues?: { [key: string]: any };
  /**
   * 内容
   */
  children?: React.ReactNode;
  /**
   * form-ref
   */
  formRef?: any;
}

interface ArchiveState {}

class Index extends React.Component<ArchiveProps, ArchiveState> {
  static defaultProps = {};

  render(): JSX.Element {
    let { className, columns, initialValues, children, formRef } = this.props;
    return (
      <div className={classnames(styles.component, className, {})}>
        <Form
          ref={formRef}
          layout={'vertical'}
          requiredMark={'optional'}
          onValuesChange={this.onValuesChange}
          initialValues={initialValues}
        >
          <Form.List key={'data'} name={'data'}>
            {() => (
              <>
                {columns?.map((column: ArchiveColumn) => (
                  <>
                    <Form.Item
                      label={column.title}
                      required={column?.required}
                      tooltip={column?.tooltip}
                      rules={column.rules}
                      name={column.key}
                      {...this.expandFormItemProps(column)}
                    >
                      <ArchiveItem column={column} />
                    </Form.Item>
                  </>
                ))}
              </>
            )}
          </Form.List>
          {children}
        </Form>
      </div>
    );
  }

  onValuesChange = (updateValues: any) => {
    console.log('updateValue', updateValues);
    let values = this.props?.formRef.current.getForm().getFieldsValue();
    console.log('onValuesChange', values);
    // this.props?.formRef.current.getForm().setFieldsValue()
  };

  expandFormItemProps = (column: ArchiveColumn) => {
    let props = {} as any;
    if (column.type === 'switch') {
      props.valuePropName = 'checked';
    }
    return props;
  };
}

export default Index;
