import React from 'react';

/**
 * 文件信息
 */
export interface FileInfo {
  url?: string,
  filename?: string;
}

/**
 * [网络]请求头
 */
export interface HttpRequestHeader {
  [key: string]: string;
}

/**
 * [网络]通用响应结果
 */
export interface Result<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

/**
 * [网络]异常响应结果
 */
export interface ExceptionResult<T = any> extends Result<T> {
  status: number;
  timestamp: number;
}

/**
 * [网络]分页数据
 */
export interface IPage<D = any> {
  current: number;
  total: number;
  size: number;
  pages: number;
  records: D[];
}

/**
 * [网络]树型数据
 */
export interface TreeNode<D = any> {
  id: number;
  parentId: number;
  title: string;
  children?: TreeNode<D>[];
}

/**
 * [网络]所有可能的响应结果
 */
export declare type HttpResult<T> =
  | Result<T>
  | Result<IPage<T>>
  | Result<TreeNode[]>
  | ExceptionResult<T>;

export declare type OverlayFunc = () => React.ReactElement;

export default {};
