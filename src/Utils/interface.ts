// 2021-06-01T00:30:30.159
export type LocalDateTime = string;

export interface UserType {
  id: ID;
  title: string;
  avatarUrl?: string;
  href?: string;
}

/**
 * ID 类型
 */
export declare type ID = string | number;

/**
 * 文件信息
 */
export interface FileInfo {
  url: string;
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
  message?: string;
  data?: T;

  [key: string]: any;
}

/**
 * [网络]异常响应结果
 */
export interface ExceptionResult<T = any> extends Result<T> {
  status: number;
  timestamp: number;
}

// [网络] 滚动拉取
export interface IScroll<D = any> {
  nextId?: ID;
  hasMore: boolean;
  records: D[];
}

export interface ScrollRo {
  nextId?: ID;
  size?: number;

  [key: string]: any;
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

export interface PageRo {
  page?: number;
  size?: number;

  [key: string]: any;
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

export interface TreeRo {
  parentId?: number;

  [key: string]: any;
}

/**
 * [本地]路由配置
 */
export interface LocalRoute {
  /**
   * 权限码
   */
  access?: string;
  /**
   * 菜单名称
   */
  title?: string;
  /**
   * 图标信息
   */
  icon?: any;
  /**
   * 路径
   */
  path?: string;
  /**
   * 是否隐藏子菜单
   */
  hideChildrenInMenu?: boolean;
  /**
   * 是否隐藏菜单
   */
  hideInMenu?: boolean;
  /**
   * 子路由
   */
  routes?: LocalRoute[];
  /**
   * [非初始化] key
   */
  key?: string;
  /**
   * [非初始化] 父级 KEY
   */
  parentKeys?: string[];
  /**
   * [非初始化] 有权限的菜单
   */
  hasAccess?: boolean;

  [key: string]: any;
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
