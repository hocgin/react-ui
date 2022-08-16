import React from 'react';
import classnames from 'classnames';
import {Logo as GinLogo} from '@hocgin/ui';
import {ConfigContext} from '@/ConfigProvider';
import {Icon} from '@hocgin/ui'

const SocialLinks: React.FC<{ className?: string }> = (props) => {
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

const DefaultCopyTitle: React.FC<{}> = () => {
  return <>
    © 2013-2021 |{' '}
    <a href="http://www.hocgin.top/" target="_blank">
      🧱 红土立方
    </a>{' | '}
    <a href="https://beian.miit.gov.cn/" target="_blank">
      闽ICP备20004537号
    </a>
  </>
}

const DefaultFooterInfo: React.FC<{
  prefixCls?: string;
}> = ({prefixCls}) => {
  return <>
    <GinLogo />
    <span className={`${prefixCls}-footerInfo-year`}>
          2022<sup>&copy;</sup>
        </span>
    <SocialLinks className={`${prefixCls}-footerInfo-links`} />
  </>
}

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  copyTitle?: React.ReactElement | string;
  footerInfo?: React.ReactElement | string;
}> = (props) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('footer', props.prefixCls);
  let copyTitle = props.copyTitle || <DefaultCopyTitle />;
  let footerInfo = props.footerInfo || <DefaultFooterInfo prefixCls={prefixCls} />;

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-footerInfo`}>
        {footerInfo}
      </div>
      <div className={`${prefixCls}-copytitle`}>
        {copyTitle}
      </div>
    </div>
  );
};

export default Index;
