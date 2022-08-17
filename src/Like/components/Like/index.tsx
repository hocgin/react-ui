import React, { useState } from 'react';
import classnames from 'classnames';
import { Icon } from '@/index';

import { ConfigContext } from '@/ConfigProvider';

export const Like: React.FC<{
  prefixCls?: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}> = ({ className, checked = false, onChange, disabled, ...props }) => {
  let { getPrefixCls } = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('like', props.prefixCls);
  let [liked, setLiked] = useState<boolean>(checked);
  return (
    <div
      className={classnames(
        prefixCls,
        {
          ['active']: liked,
        },
        className,
      )}
      onClick={() => {
        if (disabled) {
          return;
        }
        let newLiked = !liked;
        setLiked(newLiked);
        onChange?.(newLiked);
      }}
    >
      <Icon.LikeFilled className={'heartSvg'} />
    </div>
  );
};
