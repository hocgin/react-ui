import React, { useState } from 'react';
import { Footer, Utils } from '@hocgin/ui';
import Service from './service';
import ProLayout, { ProBreadcrumb } from '@ant-design/pro-layout';
import { MenuDataItem } from '@umijs/route-utils';
import { fastGetMenuDataItem } from '@/Promise/components/PageLayout/utils';
import { WithFalse } from '@ant-design/pro-layout/lib/typings';
import { HeaderViewProps } from '@ant-design/pro-layout/lib/Header';
import { BasicLayoutProps } from '@ant-design/pro-layout/lib/BasicLayout';

export interface PageLayoutProps extends BasicLayoutProps {
  /**
   * 请求地址
   */
  action: string;
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
  title,
  logo,
  action,
  route,
  location,
  children,
  ...rest
}) => {
  // @formatter: on
  const [pathname, setPathname] = useState('/default');
  let requestProxy = async (
    params: Record<string, any>,
    defaultMenuData: MenuDataItem[],
  ): Promise<MenuDataItem[]> => {
    let resp = await Service.initialValues(action);
    if (Utils.Ui.isSuccess(resp)) {
      return fastGetMenuDataItem(route?.routes ?? [], resp?.data);
    }
    return defaultMenuData;
  };

  return (
    <ProLayout
      menu={{ request: requestProxy }}
      location={{ pathname }}
      fixSiderbar
      fixedHeader
      logo={logo}
      title={title}
      rightContentRender={rightContentRender}
      headerContentRender={() => <ProBreadcrumb />}
      menuItemRender={(item, dom) => (
        <a onClick={() => setPathname(item.path || '/welcome')}>{dom}</a>
      )}
      footerRender={() => <Footer />}
      {...rest}
    >
      {children}
    </ProLayout>
  );
};
export default PageLayout;
