import { useRequest as aUseRequest } from 'ahooks';
import { Options, Plugin, Result } from 'ahooks/lib/useRequest/src/types';

export type Action<TType, TData, TParams extends any[]> = (
  type: TType,
  ...args: TParams
) => Promise<TData>;

function useRequest<TType, TData, TParams extends any[]>(
  type: TType,
  action: Action<TType, TData, TParams>,
  options?: Options<TData, TParams>,
  plugins?: Plugin<TData, TParams>[],
): Result<TData, TParams> {
  return aUseRequest<TData, TParams>(
    async (...args: TParams) => {
      return await action(type, ...args);
    },
    options,
    plugins,
  );
}

export default useRequest;
