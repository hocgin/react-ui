import React from 'react';
import classnames from 'classnames';
import { Logo as GinLogo } from '@hocgin/ui';
import { ConfigContext } from '@/config-provider';
import './index.less';

const GitHubFilled = (props: any) => {
  return (
    <i className={classnames(props.className)}>
      <svg
        width="18px"
        height="18px"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>GitHub icon</title>
        <path
          fill="currentColor"
          d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
        />
      </svg>
    </i>
  );
};

const SinaWeiboFilled = (props: any) => {
  return (
    <i className={classnames(props.className)}>
      <svg
        width="18px"
        height="18px"
        role="img"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Sina Weibo icon</title>
        <path
          fill="currentColor"
          d="M10.098 20.323c-3.977.391-7.414-1.406-7.672-4.02-.259-2.609 2.759-5.047 6.74-5.441 3.979-.394 7.413 1.404 7.671 4.018.259 2.6-2.759 5.049-6.737 5.439l-.002.004zM9.05 17.219c-.384.616-1.208.884-1.829.602-.612-.279-.793-.991-.406-1.593.379-.595 1.176-.861 1.793-.601.622.263.82.972.442 1.592zm1.27-1.627c-.141.237-.449.353-.689.253-.236-.09-.313-.361-.177-.586.138-.227.436-.346.672-.24.239.09.315.36.18.601l.014-.028zm.176-2.719c-1.893-.493-4.033.45-4.857 2.118-.836 1.704-.026 3.591 1.886 4.21 1.983.64 4.318-.341 5.132-2.179.8-1.793-.201-3.642-2.161-4.149zm7.563-1.224c-.346-.105-.57-.18-.405-.615.375-.977.42-1.804 0-2.404-.781-1.112-2.915-1.053-5.364-.03 0 0-.766.331-.571-.271.376-1.217.315-2.224-.27-2.809-1.338-1.337-4.869.045-7.888 3.08C1.309 10.87 0 13.273 0 15.348c0 3.981 5.099 6.395 10.086 6.395 6.536 0 10.888-3.801 10.888-6.82 0-1.822-1.547-2.854-2.915-3.284v.01zm1.908-5.092c-.766-.856-1.908-1.187-2.96-.962-.436.09-.706.511-.616.932.09.42.511.691.932.602.511-.105 1.067.044 1.442.465.376.421.466.977.316 1.473-.136.406.089.856.51.992.405.119.857-.105.992-.512.33-1.021.12-2.178-.646-3.035l.03.045zm2.418-2.195c-1.576-1.757-3.905-2.419-6.054-1.968-.496.104-.812.587-.706 1.081.104.496.586.813 1.082.707 1.532-.331 3.185.15 4.296 1.383 1.112 1.246 1.429 2.943.947 4.416-.165.48.106 1.007.586 1.157.479.165.991-.104 1.157-.586.675-2.088.241-4.478-1.338-6.235l.03.045z"
        />
      </svg>
    </i>
  );
};

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
          <GitHubFilled className={`${className}-github`} />
        </a>
      </li>
      <li>
        <a
          href="https://weibo.com/hocgin"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SinaWeiboFilled className={`${className}-weibo`} />
        </a>
      </li>
    </ul>
  );
};

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  defaultParams?: any;
}> = (props, ref) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
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
