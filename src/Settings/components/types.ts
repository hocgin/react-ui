import { ID } from '@/Utils/interface';

export interface GetConfigParamsType {
}


export interface SetConfigParamsType {
  valueId: ID;
  value?: any;
}


export interface ConfigScopeStructType {
  id: ID;
  title: string;
  scope: string;
  remark?: string;
  items?: ConfigScopeItemType[];
}

export interface ConfigScopeItemType {
  scopeId: ID;
  itemId: ID;
  name: string;
  title: string;
  remark?: string;
  valueId?: ID;
  value?: any;
  type: any;
  defaultValue?: any;
  readable: boolean;
  writable: boolean;
  nullable: boolean;
}

interface User {
  id: ID;
  name: string;
  description: string;
  avatarUrl?: string;
}

export interface ConfigScopeType {
  user: User;
  groups: ConfigScopeGroupType[];
}

interface ConfigScopeGroupType {
  title: string;
  menus: ConfigScopeStructType[];
}

export interface UseAction {
  // 获取配置
  getConfig?: (
    args: GetConfigParamsType,
  ) => Promise<ConfigScopeType>;
  // 更新配置
  setConfig?: (args: SetConfigParamsType) => Promise<any>;
}
