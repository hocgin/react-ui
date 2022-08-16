import React from 'react';
import classnames from 'classnames';
import {Logo as GinLogo} from '@hocgin/ui';
import {ConfigContext} from '@/ConfigProvider';
import {Icon} from '@hocgin/ui'

const SocialLinks = (props: any) => {
  let className = props.className;
  return (
    <ul className={className}>
      <li>
        <a
          href="https://github.com/hocgin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon.GitHubFilled className={`${className}-github`} />
        </a>
      </li>
      <li>
        <a
          href="https://weibo.com/hocgin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon.WeiboFilled className={`${className}-weibo`} />
        </a>
      </li>
    </ul>
  );
};

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  defaultParams?: any;
}> = (props) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('footer', props.prefixCls);
  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-footerInfo`}>
        <GinLogo />
        <span className={`${prefixCls}-footerInfo-year`}>
          2020<sup>&copy;</sup>
        </span>
        <SocialLinks className={`${prefixCls}-footerInfo-links`} />
      </div>
      <div className={`${prefixCls}-copytitle`}>
        © 2013-2021 |{' '}
        <a href="http://www.hocgin.top/" target="_blank">
          🧱 红土立方
        </a>{' '}
        |{' '}
        <a href="https://beian.miit.gov.cn/" target="_blank">
          闽ICP备20004537号
        </a>
      </div>
    </div>
  );
};

export default Index;
