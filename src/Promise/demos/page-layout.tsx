/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Promise, Logo } from '@hocgin/ui';
import localRoutes from './page-layout-config';
import { Divider, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-layout';

export default class Index extends React.PureComponent<{}> {
  state = {};

  render() {
    return (
      <div style={{ height: '100vh' }}>
        <Promise.PageLayout
          {...localRoutes}
          action={'https://api-dev.hocgin.top/api/authority'}
          rightContentRender={() => (
            <div>
              <Avatar shape="square" size="small" icon={<UserOutlined />} />
            </div>
          )}
        >
          <Promise.PageContainer waterMarkProps={{ content: 'HOCGIN' }}>
            <div style={{ height: '110vh' }}>内容</div>
          </Promise.PageContainer>
        </Promise.PageLayout>
      </div>
    );
  }
}
