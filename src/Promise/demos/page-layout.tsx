/**
 * title: 我是标题
 * desc: 我是简介，我可以用 `Markdown` 来编写
 */
import React from 'react';
import { Promise, useGet } from '@hocgin/ui';
import localRoutes from './page-layout-config';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

let useAction = {
  initialValues: async () => {
    // let data = await useGet('https://api-dev.hocgin.top/api/authority').then(res => {
    //   return res?.data;
    // });
    return [
      'access.role',
      'devtools.short_url',
      'devtools.request_log',
      'devtools.data_dict',
      'com.project',
      'mina.nes_game',
      'mina.toolset',
      'payment.notify',
      'payment.trade.detail',
      'payment.trade',
      'payment.access_app',
      'access.user_group',
      'home',
      'access.authority',
      'access.api',
      'ums.user',
      'home.dashboard',
      'devtools',
      'com',
      'mina',
      'payment',
      'access',
      'ums',
    ];
  },
};

export default class Index extends React.PureComponent<{}> {
  state = {};

  render() {
    let style = { height: '100vh' };
    let waterMark = { content: 'HOCGIN' };

    return (
      <div style={style}>
        <Promise.PageLayout
          {...localRoutes}
          useAction={useAction}
          rightContentRender={() => (
            <div>
              <Avatar shape='square' size='small' icon={<UserOutlined />} />
            </div>
          )}>
          <Promise.PageContainer waterMarkProps={waterMark}>
            <div style={style}>内容</div>
          </Promise.PageContainer>
        </Promise.PageLayout>
      </div>
    );
  }
}
