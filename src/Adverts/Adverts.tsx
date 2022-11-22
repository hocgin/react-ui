import React from 'react';
import { ConfigContext } from '@/ConfigProvider';
import classnames from 'classnames';
import { Carousel, Image } from 'antd';

export interface AdvertItemType {
  title?: string;
  flag?: string;
  imageUrl: string;
  url: string;
}

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  height?: string | number;
  width?: string | number;
  items: AdvertItemType[];
}> = ({ height = 80, width = '100%', items, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('adverts', props.prefixCls);
  return (
    <div className={classnames(`${prefixCls}`)} style={{ width, height }}>
      <Carousel autoplay effect='fade'>
        {(items || []).map(({ imageUrl, url, flag = '推广', title }) => <>
          <a href={url}>
            <div className={`${prefixCls}-item`} style={{ width, height }}>
              <div className={`${prefixCls}-flag`}>{flag}</div>
              <Image className={`${prefixCls}-image`} preview={false} src={imageUrl} />
            </div>
          </a>
        </>)}
      </Carousel>
    </div>
  );
};

export default Index;
