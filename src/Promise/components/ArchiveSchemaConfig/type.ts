export interface UseAction {
  initialValues: (params: Record<string, any>) => Promise<any>;
  submit: (params: Record<string, any>) => Promise<any>;
}
