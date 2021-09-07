import { ColumnsType } from 'antd/lib/table/interface';
import { IPage } from '@/Utils/interface';

/**
 * {path}/_paging
 */

/**
 * 列信息
 */
export interface TableColumns<T> extends ColumnsType<T> {
}

export interface TableIPage extends IPage<TableData> {
}

export interface TableData {
  id: any;
  [key: string]: any;
}

export interface EventInfo {
  key: string;
}

export default {};
