import React from 'react';
import classnames from 'classnames';
import { default as GinLogo } from '@/Logo';
import { ConfigContext } from '@/ConfigProvider';
import Icon from '@/Icon';
const DefaultCopyTitle: React.FC<{}> = () => {
  return (
    <>
      © 2013-2021 |{' '}
      <a href="http://www.hocgin.top/" target="_blank">
        🧱 红土立方
      </a>
      {' | '}
      <a href="https://beian.miit.gov.cn/" target="_blank">
        闽ICP备20004537号
      </a>
    </>
  );
};

const DefaultFooterInfo: React.FC<{
  prefixCls?: string;
}> = ({ prefixCls }) => {
  return (
    <>
      <GinLogo />
    </>
  );
};

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  copyTitle?: React.ReactElement | string;
  footerInfo?: React.ReactElement | string;
}> = (props) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('footer', props.prefixCls);
  let copyTitle = props.copyTitle || <DefaultCopyTitle />;
  let footerInfo = props.footerInfo || (
    <DefaultFooterInfo prefixCls={prefixCls} />
  );

  return (
    <div className={`${prefixCls}`}>
      <div className={`${prefixCls}-footerInfo`}>{footerInfo}</div>
      {copyTitle && <div className={`${prefixCls}-copytitle`}>{copyTitle}</div>}
    </div>
  );
};

export default Index;
