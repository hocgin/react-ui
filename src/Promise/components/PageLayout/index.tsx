import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { Footer } from '@/index';
import ProLayout, { ProBreadcrumb } from '@ant-design/pro-layout';
import { MenuDataItem } from '@umijs/route-utils';
import { fastGetAccess, fastGetMenuDataItem } from './utils';
import { WithFalse } from '@ant-design/pro-layout/lib/typings';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { BasicLayoutProps } from '@ant-design/pro-layout/lib/BasicLayout';
import Lang from '@/Utils/lang';
import { LocalRoute } from '@/Utils/interface';

const DEFAULT_PATHNAME = '/welcome';

export interface PageLayoutProps extends BasicLayoutProps {
  /**
   * 请求
   */
  useAction: {
    initialValues: () => Promise<string[]>;
  };
  /**
   * 左上角标题
   */
  title?: string;
  /**
   * logo
   */
  logo?: React.ReactNode;
  /**
   * 内容
   */
  children?: JSX.Element;
  /**
   * 路由
   */
  route?: { routes: LocalRoute[] };
  /**
   * 右上角
   */
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
  /**
   * 显示所有(拥有所有菜单)
   */
  isShowAll?: boolean;
}

// @formatter: off
const PageLayout: React.FC<PageLayoutProps> = ({
  rightContentRender,
  title,
  logo,
  useAction,
  route,
  isShowAll = Lang.isDev(),
  location,
  children,
  ...rest
}) => {
  // @formatter: on
  const [pathname, setPathname] = useState(DEFAULT_PATHNAME);

  let { runAsync } = useRequest(useAction!.initialValues, {
    manual: true,
  });

  let menu = {
    request: (params: Record<string, any>, defaultMenuData: MenuDataItem[]) => {
      let routes = route?.routes ?? [];
      if (isShowAll) {
        return Promise.resolve(
          fastGetMenuDataItem(routes, fastGetAccess(routes)),
        );
      }
      return runAsync().then(
        (access = []) => fastGetMenuDataItem(routes, access) || defaultMenuData,
      );
    },
  };
  return (
    <ProLayout
      menu={menu}
      location={{ pathname }}
      fixSiderbar
      fixedHeader
      logo={logo}
      title={title}
      rightContentRender={rightContentRender}
      headerContentRender={() => <ProBreadcrumb />}
      menuItemRender={(item, dom) => (
        <a onClick={() => setPathname(item.path || DEFAULT_PATHNAME)}>{dom}</a>
      )}
      footerRender={() => <Footer />}
      {...rest}
    >
      {children}
    </ProLayout>
  );
};
export default PageLayout;
