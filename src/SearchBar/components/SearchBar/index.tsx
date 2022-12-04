import React, { ReactNode, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Col, Form, Row } from 'antd';
import { LangKit } from '@/_utils';
import classnames from 'classnames';
import { ConfigContext } from '@/ConfigProvider';

interface SearchBarProps {
  prefixCls?: string;
  className?: string;
  children?: any[];
  onSubmit?: (values: any) => void;
}

const Index: React.FC<SearchBarProps> = ({
  onSubmit,
  className,
  children = [],
  ...props
}) => {
  let [isExpand, setIsExpand] = useState<boolean>();
  let [searchBarForm] = Form.useForm();
  let rowStyle = { width: '100%' };
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('search-bar', props.prefixCls);
  let onReset = () => {
    searchBarForm.resetFields();
  };

  return (
    <div className={classnames(prefixCls, className)}>
      <Form
        form={searchBarForm}
        onFinish={(values) => onSubmit && onSubmit(values)}
        layout="inline"
      >
        {isExpand ? (
          LangKit.chunk(children, 3)
            .map((el: ReactNode[], index: number) => (
              <Row
                key={index}
                style={rowStyle}
                gutter={
                  {
                    md: 24,
                    lg: 24,
                    xl: 24,
                  } as any
                }
              >
                {el.map((item, index) => (
                  <Col key={index} md={8} sm={24}>
                    {item}
                  </Col>
                ))}
              </Row>
            ))
            .concat(
              <div key={3} style={{ overflow: 'hidden', width: '100%' } as any}>
                <div style={{ float: 'right', marginBottom: 24 } as any}>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button
                    htmlType="button"
                    style={{ marginLeft: 8 } as any}
                    onClick={onReset}
                  >
                    重置
                  </Button>
                  <a
                    href={``}
                    style={{ marginLeft: 8 } as any}
                    onClick={() => setIsExpand(!isExpand)}
                  >
                    收起 <UpOutlined />
                  </a>
                </div>
              </div>,
            )
        ) : (
          <Row style={rowStyle} gutter={{ md: 24, lg: 24, xl: 24 } as any}>
            {LangKit.slice(children, 2)
              .map((item: ReactNode, index: number) => (
                <Col key={index} md={8} sm={24}>
                  {item}
                </Col>
              ))
              .concat(
                <Col key={children.length + 1} md={8} sm={24}>
                  <span className={'submitButtons'}>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button
                      htmlType="button"
                      style={{ marginLeft: 8 } as any}
                      onClick={onReset}
                    >
                      重置
                    </Button>
                    <a
                      style={{ marginLeft: 8 } as any}
                      onClick={() => setIsExpand(!isExpand)}
                    >
                      展开 <DownOutlined />
                    </a>
                  </span>
                </Col>,
              )}
          </Row>
        )}
      </Form>
    </div>
  );
};

export default Index;
