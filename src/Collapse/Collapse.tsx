import React from 'react';
import { Collapse } from 'antd';
import { ConfigContext } from '@/ConfigProvider';

const Index: React.FC<{
  prefixCls?: string;
  children?: React.ReactNode | string;
  defaultActiveKey?: Array<string | number> | string | number;
}> = ({ defaultActiveKey, children, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('collapse', props.prefixCls);
  return (
    <div className={`${prefixCls}`}>
      <Collapse
        expandIconPosition="right"
        bordered={false}
        accordion
        defaultActiveKey={defaultActiveKey}
      >
        {children}
      </Collapse>
    </div>
  );
};

export default Index;
