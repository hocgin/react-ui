import { LocalRoute } from '@/Utils/interface';

export default {
  // 下面是每个项目配置的路由
  route: {
    path: '/',
    component: '@/layouts/BasicLayout',
    routes: [
      {
        title: '支付网关',
        access: 'payment',
        icon: 'home',
        path: '/bmw',
        routes: [
          {
            title: '接入商户',
            access: 'payment.access_mch',
            icon: 'SmileOutlined',
            path: '/bmw/access-mch',
            component: '@/pages/test',
          },
          {
            title: '支付商户',
            access: 'payment.payment_mch',
            icon: 'SmileOutlined',
            path: '/bmw/payment-mch',
            component: '@/pages/index',
          },
          {
            title: '场景配置',
            access: 'payment.pay_scene',
            icon: 'SmileOutlined',
            path: '/bmw/pay-scene',
            component: '@/pages/test',
          },
          {
            title: '交易账单',
            access: 'payment.trade',
            icon: 'SmileOutlined',
            path: '/bmw/trade-order',
            hideChildrenInMenu: true,
            routes: [
              {
                title: '交易账单',
                access: 'payment.trade',
                icon: 'SmileOutlined',
                path: '/bmw/trade-order',
                component: '@/pages/test',
              },
            ],
          },
          {
            title: '通知接入商户记录',
            access: 'payment.sync_access_mch',
            icon: 'SmileOutlined',
            path: '/bmw/sync-access-mch',
            component: '@/pages/test',
            routes: [
              {
                title: '接入商户',
                access: 'payment.access_mch',
                icon: 'SmileOutlined',
                path: '/bmw/access-mch',
                component: '@/pages/test',
              },
              {
                title: '支付商户',
                access: 'payment.payment_mch',
                icon: 'SmileOutlined',
                path: '/bmw/payment-mch',
                component: '@/pages/index',
              },
            ],
          },
        ],
      },
      {
        component: '@/pages/404',
      },
    ] as LocalRoute[],
  },
  location: {
    pathname: '/',
  },
};
