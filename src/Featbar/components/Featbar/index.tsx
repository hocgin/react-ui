import React, { useState } from 'react';
import classnames from 'classnames';
import { Logo as GinLogo } from '@/index';
import { ConfigContext } from '@/ConfigProvider';

interface FeatbarProps {
  prefixCls?: string;
  title?: string;
  children?: any;
  feedbackUrl?: string;
  changeLogUrl?: string;
  linkMeUrl?: string;
  helpUrl?: string;
  featureUrl?: string;
  projectUrl?: string;
}

const DefaultContent = (props: any) => {
  let {
    feedbackUrl,
    changeLogUrl,
    linkMeUrl,
    helpUrl,
    featureUrl,
    projectUrl,
  } = props;
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('featbar', props.prefixCls);

  return (
    <div className={`${prefixCls}--dil`}>
      {feedbackUrl && (
        <div>
          <a href={feedbackUrl}>建议反馈</a>
        </div>
      )}
      {changeLogUrl && (
        <div>
          <a href={changeLogUrl}>更新日志</a>
        </div>
      )}
      {helpUrl && (
        <div>
          <a href={helpUrl}>帮助文档</a>
        </div>
      )}
      {projectUrl && (
        <div>
          <a href={projectUrl}>项目列表</a>
        </div>
      )}
      {featureUrl && (
        <div>
          <a href={featureUrl}>新功能</a>
        </div>
      )}
      {linkMeUrl && (
        <div>
          <a href={linkMeUrl}>联系我</a>
        </div>
      )}
    </div>
  );
};

const Index: React.FC<FeatbarProps> = ({
  title = 'Hi, 你好! 👏',
  feedbackUrl = 'https://www.yuque.com/gin/topics?label_ids=13074',
  changeLogUrl = 'https://www.yuque.com/gin/changelog',
  helpUrl = 'https://www.yuque.com/gin/help',
  featureUrl = 'https://www.yuque.com/gin/feature',
  linkMeUrl = 'mailto:hocgin@gmail.com',
  projectUrl = 'http://projects.hocg.in',
  children,
  ...props
}) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('featbar', props.prefixCls);
  let [visible, setVisible] = useState<boolean>(true);
  let [open, setOpen] = useState<boolean>(false);
  return (
    <div
      className={classnames(prefixCls, {
        [`${prefixCls}--visible`]: visible,
        [`${prefixCls}--open`]: open,
      })}
    >
      <button
        className={classnames(`${prefixCls}--toggle`)}
        onClick={() => setOpen(!open)}
      >
        {open ? '-' : '+'}
      </button>
      <div className={`${prefixCls}--container`}>
        <div className={`${prefixCls}--body`}>
          <div className={`${prefixCls}--title`}>{title}</div>
          {
            <div className={`${prefixCls}--lbl`}>
              {children || (
                <DefaultContent
                  {...{
                    feedbackUrl,
                    changeLogUrl,
                    helpUrl,
                    featureUrl,
                    linkMeUrl,
                    projectUrl,
                  }}
                />
              )}
            </div>
          }
        </div>
        <div className={`${prefixCls}--footer`}>
          <div className={`${prefixCls}--logo`}>
            <GinLogo />
          </div>
          <div
            className={`${prefixCls}--btn`}
            onClick={() => setVisible(false)}
          >
            关闭
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
