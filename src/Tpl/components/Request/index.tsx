import React, { useState, useMemo, useRef } from 'react';
import styles from './index.less';
import useSWR, { mutate } from 'swr';
import classnames from 'classnames';

export interface RequestProps {
  /**
   * 设置样式名
   */
  className?: string;
  initialValues?: any;
  params?: any;
  request?: (values: any, props: RequestProps) => Promise<any>;
  uiKey?: string;
}

let testId = 0;
const Request: React.FC<RequestProps> = (props, ref) => {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<any>({});

  const fetchData = async () => {
    if (!props.request) {
      return [];
    }
    setLoading(true);
    const loadData = await props.request({ ...props?.params, ...values }, props);
    setLoading(false);
    return loadData;
  };

  const [cacheKey] = useState(() => {
    if (props.uiKey) {
      return props.uiKey.toString();
    }
    testId += 1;
    return testId.toString();
  });
  const fieldKeyRef = useRef(cacheKey);
  const key = useMemo(() => {
    if (!props.request) {
      return 'no-fetch';
    }
    if (!props.params) {
      return fieldKeyRef.current;
    }
    return [fieldKeyRef.current, JSON.stringify({ ...props.params, ...values })];
  }, [props.params]);

  const { data, mutate: setLocaleData } = useSWR(key, fetchData, {
    revalidateOnFocus: false,
    shouldRetryOnError: false,
    revalidateOnReconnect: false,
  });

  return (<div>{loading ? '加载中' : `${JSON.stringify(data)}`}</div>);
};

export default Request;
