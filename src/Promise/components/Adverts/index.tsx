import React, { useState } from 'react';
import Adverts from '@/Adverts';
import { LangKit } from '@/_utils';
import { AdvertItemType } from '@/Adverts/Adverts';
import { useRequest } from 'ahooks';

export interface UseAction {
  initialValues: () => Promise<AdvertItemType[]>;
}

const Index: React.FC<{
  prefixCls?: string;
  useAction?: UseAction;
  className?: string;
}> = ({ prefixCls, useAction, className }) => {
  let [item, setItem] = useState<AdvertItemType[]>([]);
  useRequest(LangKit.nilService(useAction?.initialValues), {
    onSuccess: setItem,
  });
  return <Adverts className={className} prefixCls={prefixCls} items={item} />;
};

export default Index;
