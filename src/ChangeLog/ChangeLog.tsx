import React from 'react';
import {Badge, Collapse} from 'antd';
import classnames from 'classnames';
import {PlusSquareOutlined, MinusSquareOutlined} from '@ant-design/icons';
import {ConfigContext} from '@/ConfigProvider';

const Panel = Collapse.Panel;
export type ChangeLog = {
  title: string | React.ReactElement;
  type?: 'next' | 'current' | 'old';
  feature?: string[] | React.ReactElement[];
};

let statusGroup: any = {
  old: 'default',
  current: 'success',
  next: 'processing',
};

const Index: React.FC<{
  prefixCls?: string;
  items?: ChangeLog[];
}> = ({items, ...props}) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('changelog', props.prefixCls);
  return (
    <Collapse
      ghost
      bordered={false}
      expandIconPosition="end"
      expandIcon={({isActive}: any) =>
        isActive ? <MinusSquareOutlined /> : <PlusSquareOutlined />
      }
      className={classnames(`${prefixCls}`, `${prefixCls}-collapse`)}
    >
      {(items || []).map(({title, type = 'old', feature = []}, index) => (
        <Panel
          key={index}
          header={<Badge status={statusGroup[type]} text={title} />}
          className={classnames(`${prefixCls}-panel`, `${prefixCls}-current`)}
        >
          {(feature || []).map((title) => (
            <div>{title}</div>
          ))}
          {['current', 'old'].includes(type) && <div>🔧 修复一些些BUG</div>}
        </Panel>
      ))}
    </Collapse>
  );
};

export default Index;
