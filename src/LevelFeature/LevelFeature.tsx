import React from 'react';
import { ConfigContext } from '@/ConfigProvider';
import classnames from 'classnames';
import { CheckCircleOutlined, CheckCircleFilled } from '@ant-design/icons';

export interface FeatureType {
  title: any;
  checked?: boolean;
}

export interface LinkButtonType {
  title: any;
  href?: string;
}

export interface ItemType {
  title?: string;
  themeColor?: string;
  badge?: any[];
  price?: any[] | any;
  feature?: FeatureType[];
  link?: LinkButtonType[];
}

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  item?: ItemType;
}> = ({ item, className, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('LevelFeature', props.prefixCls);
  let featureList = item?.feature ?? [];
  let linkList = item?.link ?? [];

  console.log('加载 LevelFeature');

  return (
    <div
      className={classnames(`${prefixCls}`, className)}
      style={{
        backgroundColor: item?.themeColor ?? 'rgb(61,64,72)',
      }}
    >
      <div>
        {/*标题*/}
        {item?.title && (
          <h3 className={classnames(`${prefixCls}-title`)}>{item?.title}</h3>
        )}
        {/*徽章*/}
        {(item?.badge?.length ?? 0) > 0 && (
          <div className={`${prefixCls}-badge`}>
            {(item?.badge || []).map((name) => (
              <span className={classnames(`${prefixCls}-badge-item`)}>
                <span className={classnames(`${prefixCls}-badge-text`)}>
                  {name}
                </span>
              </span>
            ))}
          </div>
        )}
        {/*价格*/}
        {typeof item?.price === 'string' && (
          <div className={`${prefixCls}-price`}>
            <div className={classnames(`${prefixCls}-price-item`)}>
              {item?.price}
            </div>
          </div>
        )}
        {typeof item?.price === 'object' && (
          <div
            className={`${prefixCls}-price`}
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${item?.price.length}, minmax(0, 1fr))`,
            }}
          >
            {(item?.price || []).map((title: any) => (
              <span
                className={classnames(
                  `${prefixCls}-price-item`,
                  `${prefixCls}-price-arrayitem`,
                )}
              >
                {title}
              </span>
            ))}
          </div>
        )}
      </div>
      {/*功能介绍*/}
      {featureList.length > 0 && (
        <ul className={`${prefixCls}-features`}>
          {featureList.map(({ title, checked }) => (
            <ol
              className={classnames(`${prefixCls}-feature`, {
                [`checked`]: checked,
              })}
            >
              {checked ? <CheckCircleFilled /> : <CheckCircleOutlined />}{' '}
              <span>{title}</span>
            </ol>
          ))}
        </ul>
      )}
      {/* 按钮 */}
      {linkList.length > 0 && (
        <div
          className={`${prefixCls}-link`}
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${linkList.length}, minmax(0, 1fr))`,
          }}
        >
          {(linkList || []).map(({ title, href }) => (
            <a
              target="_blank"
              className={classnames(`${prefixCls}-link-item`)}
              href={href}
            >
              {title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Index;
