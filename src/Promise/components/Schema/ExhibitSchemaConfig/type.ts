import { RequestData } from '@ant-design/pro-descriptions/lib/useFetchData';

export interface UseAction {
  initialValues: (params: Record<string, any>) => Promise<RequestData>;
}
