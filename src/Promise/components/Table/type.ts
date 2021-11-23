import { ColumnsType } from 'antd/lib/table/interface';
import { PageRo, IPage } from '@/Utils/interface';


export interface UseAction {
  paging: (ro: PageRo) => Promise<IPage>;
}

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
