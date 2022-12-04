import { MenuDataItem } from '@umijs/route-utils';
import { LocalRoute } from '@/Utils/interface';
import memoizeOne from 'memoize-one';
import { UIKit } from '@/_utils';

export let fastGetMenuDataItem = memoizeOne(getMenuDataItem);

function getMenuDataItem(
  routes: LocalRoute[],
  accesss: string[],
): MenuDataItem[] {
  // 过滤有权限的菜单
  let routeMap = asRouteMap(routes);
  Object.values(routeMap)
    .filter(({ access }) => access && accesss.includes(access))
    .forEach((item) => {
      item.hasAccess = true;
      item.parentKeys?.forEach((key) => {
        routeMap[key].hasAccess = true;
      });
    });
  console.log('routes', routes);

  // 构建树型菜单
  return fastRoutesToMenuDataItems(routes ?? [], accesss);
}

let fastRoutesToMenuDataItems = memoizeOne(routesToMenuDataItems);

function routesToMenuDataItems(
  routes: LocalRoute[],
  accesss: string[],
): MenuDataItem[] {
  return (routes || [])
    .filter(({ hasAccess }) => hasAccess)
    .map((route) => {
      let result: MenuDataItem = asMenuDataItem(route);
      result.children = routesToMenuDataItems(route?.routes || [], accesss);
      return result;
    });
}

function asRouteMap(routes: LocalRoute[]): Record<string, LocalRoute> {
  const routeMap: Record<string, LocalRoute> = {};
  const mergeMenuAndRouter = (data: LocalRoute[]) => {
    (data || []).forEach((item: LocalRoute) => {
      item.key = `${item.path}`;
      if (item.routes) {
        mergeMenuAndRouter(item.routes);
        item.routes.forEach((x: LocalRoute) => {
          x.parentKeys = [...(item.parentKeys || []), item.key!];
        });
      }
      routeMap[`${item.key}`] = item;
    });
  };
  mergeMenuAndRouter(routes);
  return routeMap;
}

function asMenuDataItem({
  key,
  path,
  icon,
  title,
  hideChildrenInMenu,
  hideInMenu,
  access,
  parentKeys,
}: LocalRoute): MenuDataItem {
  return {
    hideChildrenInMenu: hideChildrenInMenu ?? false,
    hideInMenu: hideInMenu ?? false,
    name: title,
    key: key,
    icon: UIKit.getIcon(icon),
    path: path,
    access: access,
    parentKeys: parentKeys,
    children: [],
  };
}

export function routesToAccess(routes: LocalRoute[]): string[] {
  return (routes || [])
    .flatMap(({ access, routes = [] }) => {
      if (!access) {
        return [...routesToAccess(routes)];
      }
      return [access, ...routesToAccess(routes)];
    })
    .filter((i) => i !== null);
}

export let fastGetAccess = memoizeOne(getAccess);

/**
 * 把路由 access 提取出来
 * @param routes
 */
function getAccess(routes: LocalRoute = []): string[] {
  return (routes || [])
    .flatMap(({ access, routes = [] }: LocalRoute) => {
      return [access, ...getAccess(routes)];
    })
    .filter((i: string) => i !== null);
}
