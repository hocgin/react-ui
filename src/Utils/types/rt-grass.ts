// :: 网络数据类型协议

export interface Option {
  value: string;
  key: string;
}

export interface SearchOption {
  value: string;
  key?: string;
  image?: string;
  description?: string;
}
