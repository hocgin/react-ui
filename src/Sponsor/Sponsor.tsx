import React, { useState } from 'react';
import { Icon } from '@/index';
import { ConfigContext } from '@/ConfigProvider';

const QrCode = (props: any) => {
  let { url, text = '' } = props;
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('sponsor--qrcode', props.prefixCls);
  return (
    <div className={prefixCls}>
      <img src={url} alt={text} />
      <span>{text}</span>
    </div>
  );
};

const Index: React.FC<{
  prefixCls?: string;
  alipay?: string;
  wechat?: string;
}> = ({
  alipay = 'https://via.placeholder.com/125',
  wechat = 'https://via.placeholder.com/125',
  ...props
}) => {
  let [open, setOpen] = useState<boolean>(false);
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('sponsor', props.prefixCls);
  return (
    <div className={prefixCls}>
      {!open && (
        <div className={'sponsorBtn'} onClick={() => setOpen(!open)}>
          <Icon.HeartFilled className={'heart'} /> <span>赞助</span>
        </div>
      )}
      {open && (
        <div>
          <QrCode url={alipay} text="支付宝" />
          <QrCode url={wechat} text="微信" />
        </div>
      )}
    </div>
  );
};

export default Index;
