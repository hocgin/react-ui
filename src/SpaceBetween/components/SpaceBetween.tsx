import React from 'react';
import classnames from "classnames";
import {ConfigContext} from "@/ConfigProvider";

export const SpaceBetween: React.FC<{
  prefixCls?: string;
  className?: string;
  label?: string;
  children?: React.ReactElement;
  checked?: boolean;
  value?: any;
  onChange?: (value: any) => void;
}> = (props) => {
  let {getPrefixCls} = React.useContext(ConfigContext);
  let prefixCls = getPrefixCls('SpaceBetween', props.prefixCls);
  let childrenEl = props?.children || <div />;
  childrenEl = {
    ...childrenEl,
    props: {
      ...childrenEl.props,
      checked: props?.checked,
      value: props?.value,
      onChange: props?.onChange
    }
  };
  return <div className={classnames(`${prefixCls}`, props.className)}>
    <span>{props.label}</span>
    <span className={classnames(`${prefixCls}-content`)}>{childrenEl}</span>
  </div>;
};
