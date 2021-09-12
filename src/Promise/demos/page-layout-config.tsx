export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/',
        component: '@/layouts/BasicLayout',
        routes: [
          {
            title: '首页',
            access: 'home',
            icon: 'HomeOutlined',
            path: '/home',
            routes: [
              {
                title: '控制台',
                access: 'home.dashboard',
                icon: 'dashboard',
                path: '/components/complex/promise',
                component: '@/pages/home/dashboard',
              },
            ],
          },
          {
            title: '用户中心',
            access: 'ums',
            icon: 'home',
            path: '/ums',
            routes: [
              {
                title: '用户管理',
                access: 'ums.user',
                icon: 'user',
                path: '/ums/user',
                component: '@/pages/ums/user',
              },
            ],
          },
          {
            title: '访问控制',
            access: 'access',
            icon: 'control',
            path: '/access',
            routes: [
              {
                title: '接口管理',
                access: 'access.api',
                path: '/access/api',
                component: '@/pages/access/api',
              },
              {
                title: '权限管理',
                access: 'access.authority',
                path: '/access/authority',
                component: '@/pages/access/authority',
              },
              {
                title: '角色管理',
                access: 'access.role',
                path: '/access/role',
                component: '@/pages/access/role',
              },
              {
                title: '用户组管理',
                access: 'access.user_group',
                path: '/access/user-group',
                hideChildrenInMenu: true,
                routes: [
                  {
                    title: '用户组管理',
                    access: 'access.user_group',
                    path: '/access/user-group',
                    component: '@/pages/access/user-group',
                  },
                  {
                    title: '用户组(详情)',
                    access: 'access.user_group.detail',
                    path: '/access/user-group/:id',
                    component: '@/pages/access/user-group/detail',
                  },
                ],
              },
            ],
          },
          {
            title: '支付网关',
            access: 'payment',
            icon: 'home',
            path: '/payment',
            routes: [
              {
                title: '接入应用',
                access: 'payment.access_app',
                icon: 'user',
                path: '/payment/access-app',
                component: '@/pages/payment/access-app',
              },
              {
                title: '交易账单',
                access: 'payment.trade',
                icon: 'user',
                path: '/payment/trade',
                hideChildrenInMenu: true,
                routes: [
                  {
                    title: '交易账单',
                    access: 'payment.trade',
                    icon: 'user',
                    path: '/payment/trade',
                    component: '@/pages/payment/trade',
                  },
                  {
                    title: '交易账单(详情)',
                    access: 'payment.trade.detail',
                    path: '/payment/trade/:id',
                    component: '@/pages/payment/trade/detail',
                  },
                ],
              },
              {
                title: '通知记录',
                access: 'payment.notify',
                icon: 'user',
                path: '/payment/notify',
              },
            ],
          },
          {
            title: '微信小程序',
            access: 'mina',
            icon: 'home',
            path: '/mina',
            routes: [
              {
                title: '工具集',
                access: 'mina.toolset',
                icon: 'user',
                path: '/mina/toolset',
                component: '@/pages/mina/toolset',
              },
              {
                title: '红白机模拟器',
                access: 'mina.nes_game',
                icon: 'user',
                path: '/mina/nes-game',
                component: '@/pages/mina/nes-game',
              },
            ],
          },
          {
            title: '通用',
            access: 'com',
            icon: 'home',
            path: '/com',
            routes: [
              {
                title: '项目配置',
                access: 'com.project',
                icon: 'user',
                path: '/com/project',
                component: '@/pages/com/project',
              },
            ],
          },
          {
            title: '开发工具',
            access: 'devtools',
            icon: 'tool',
            path: '/devtools',
            routes: [
              {
                title: '数据字典',
                access: 'devtools.data_dict',
                icon: 'database',
                path: '/devtools/data-dict',
                component: '@/pages/devtools/data-dict',
              },
              {
                title: '请求日志',
                access: 'devtools.request_log',
                icon: 'database',
                path: '/devtools/request-log',
                component: '@/pages/access/authority',
              },
              {
                title: '短链接',
                access: 'devtools.short_url',
                icon: 'database',
                path: '/devtools/short-url',
                component: '@/pages/access/authority',
              },
            ],
          },
        ],
      },
      {
        component: '@/pages/404',
      },
    ],
  },
  location: {
    pathname: '/',
  },
};
