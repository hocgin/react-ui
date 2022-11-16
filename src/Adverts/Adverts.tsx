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

export let defaultAdver = [{
  title: '随机',
  flag: '推荐',
  imageUrl: 'https://cdn.hocgin.top/uPic/favicon.ico',
  url: 'http://www.baidu.com',
}, {
  title: '随机',
  flag: '作者推荐',
  imageUrl: 'https://cdn.hocgin.top/file/addone-bookmarking_nav-background.png',
  url: 'http://www.baidu.com',
}, {
  title: '随机',
  flag: '作者推荐',
  imageUrl: 'https://cdn.hocgin.top/file/20221116_tuijian.png',
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
