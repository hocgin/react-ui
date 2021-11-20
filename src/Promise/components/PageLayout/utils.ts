import { MenuDataItem } from '@umijs/route-utils';
import { LocalRoute } from '@/Utils/interface';
import memoizeOne from 'memoize-one';
import { Ui } from '@/Utils/ui';

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

  // 构建树型菜单
  return fastRoutesToMenuDataItems(routes[0]?.routes ?? [], accesss);
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
          // @ts-ignore
          x.parentKeys = [...(item.parentKeys || []), item.key];
        });
      }

      routeMap[`${item.key}`] = item;
    });
  };
  mergeMenuAndRouter(routes);
  console.log('ro', routeMap);
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
    hideChildrenInMenu: hideChildrenInMenu,
    hideInMenu: hideInMenu,
    name: title,
    key: key,
    icon: Ui.getIcon(icon),
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