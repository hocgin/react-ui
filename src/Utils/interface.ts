import React from 'react';

export interface HttpRequestHeader {
  [key: string]: string;
}

export interface Result<T = any> {
  success: boolean,
  message: string,
  data?: T
}

export interface ExceptionResult<T = any> extends Result<T> {
  status: number,
  timestamp: number
}

export interface IPage<D = any> {
  current: number,
  total: number,
  size: number,
  records: D,
}

export declare type HttpResult<T> = (Result<T> | Result<IPage<T>> | ExceptionResult<T>);

export declare type OverlayFunc = () => React.ReactElement;

export default {};
