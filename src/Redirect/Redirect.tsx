import React, {useEffect, useState} from 'react';
import {ConfigContext} from '@/ConfigProvider';
import classnames from 'classnames';
import {Button} from "antd";
import {useCountDown} from "ahooks";

let jumpElementId = 'jump';

const Index: React.FC<{
  prefixCls?: string;
  className?: string;
  jumpId?: string;
  redirectUrl?: string;
}> = ({...props}) => {
  let jumpId = props?.jumpId ?? jumpElementId;
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('Redirect', props.prefixCls);
  const [targetDate, setTargetDate] = useState<number>();
  const [countdown] = useCountDown({
    targetDate,
    onEnd: () => document.getElementById(jumpId)?.click(),
  });
  useEffect(() => {
    setTargetDate(Date.now() + 5 * 1000);
  }, []);

  return (
    <div className={classnames(`${prefixCls}`)}>
      <div>正在跳转中({Math.round(countdown / 1000)}秒)..</div>
      <div>
        如果浏览器不支持跳转，可以手动点击
        <Button
          id={jumpId}
          type="link"
          size={'large'}
          href={`${props?.redirectUrl}`}
        >
          确认
        </Button>
        进行跳转
      </div>
    </div>
  );
};

export default Index;
