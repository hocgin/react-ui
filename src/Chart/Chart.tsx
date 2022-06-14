import React from 'react';
import { ConfigProvider } from '@/index';
import { Line } from '@ant-design/charts';
import classnames from 'classnames';

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  defaultParams?: any;
}> = ({ ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigProvider.ConfigContext);
  let prefixCls = getPrefixCls('chart', props.prefixCls);
  const data = [
    { year: '1991', value: 3 },
    { year: '1992', value: 4 },
    { year: '1993', value: 3.5 },
    { year: '1994', value: 5 },
    { year: '1995', value: 4.9 },
    { year: '1996', value: 6 },
    { year: '1997', value: 7 },
    { year: '1998', value: 9 },
    { year: '1999', value: 13 },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    point: {
      size: 5,
      shape: 'diamond',
    },
  };
  return (
    <div className={classnames(`${prefixCls}`)}>
      <Line {...config} />
    </div>
  );
};

export default Index;
