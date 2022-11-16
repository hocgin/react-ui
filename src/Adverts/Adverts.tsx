import React from 'react';
import { ConfigContext } from '@/ConfigProvider';
import classnames from 'classnames';
import { Carousel, Image } from 'antd';

export interface AdvertItemType {
  title?: string;
  imageUrl: string;
  url: string;
}

export let defaultAdver = [{
  title: '随机',
  imageUrl: 'https://cdn.hocgin.top/uPic/favicon.ico',
  url: 'http://www.baidu.com',
}, {
  title: '随机',
  imageUrl: 'https://cdn.hocgin.top/file/addone-bookmarking_nav-background.png',
  url: 'http://www.baidu.com',
}];

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  height?: string | number;
  width?: string | number;
  items: AdvertItemType[];
}> = ({ height = 80, width = '100%', items = defaultAdver, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('adverts', props.prefixCls);
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };


  return (
    <div className={classnames(`${prefixCls}`)} style={{ width, height }}>
      <Carousel afterChange={onChange} autoplay effect='fade'>
        {(items || []).map(({ imageUrl, url, title }) => <>
          <a href={url}>
            <div className={`${prefixCls}-item`} style={{ width, height }}>
              <div className={`${prefixCls}-flag`}>推广</div>
              <Image className={`${prefixCls}-image`} preview={false} src={imageUrl} />
            </div>
          </a>
        </>)}
      </Carousel>
    </div>
  );
};

export default Index;
