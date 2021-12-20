// :: 网络数据类型协议

export interface Option {
  value: any;
  key: string;
}

export interface SearchOption {
  value: any;
  key?: string;
  image?: string;
  description?: string;
}
