import React from 'react';
import {
  PageContainer as AntdPageContainer,
  PageContainerProps as AntdPageContainerProps,
} from '@ant-design/pro-layout';

interface PageContainerProps extends AntdPageContainerProps {}

// @formatter: off
const PageContainer: React.FC<PageContainerProps> = ({ children, ...rest }) => {
  // @formatter: on
  return (
    <AntdPageContainer breadcrumbRender={false} {...rest}>
      {children}
    </AntdPageContainer>
  );
};
export default PageContainer;
