import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { Footer } from '@hocgin/ui';
import ProLayout, { ProBreadcrumb } from '@ant-design/pro-layout';
import { MenuDataItem } from '@umijs/route-utils';
import { fastGetMenuDataItem } from '@/Promise/components/PageLayout/utils';
import { WithFalse } from '@ant-design/pro-layout/lib/typings';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { BasicLayoutProps } from '@ant-design/pro-layout/lib/BasicLayout';

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
  route?: any;
  /**
   * 右上角
   */
  rightContentRender?: WithFalse<(props: HeaderViewProps) => React.ReactNode>;
}

// @formatter: off
const PageLayout: React.FC<PageLayoutProps> = ({
                                                 rightContentRender,
                                                 title, logo,
                                                 useAction,
                                                 route,
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
      return runAsync().then((access = []) => (fastGetMenuDataItem(route?.routes ?? [], access) || defaultMenuData));
    },
  };
  return (<ProLayout menu={menu}
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
                     {...rest}>
    {children}
  </ProLayout>);
};
export default PageLayout;
