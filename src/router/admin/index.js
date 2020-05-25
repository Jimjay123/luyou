export default [
  {
    path: '/admin',
    name: 'admin',
    component: require('@/pages/admin').default,
    meta: { type: 'orther' },
    redirect: '/admin/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: require('@/pages/admin/dashboard').default,
        meta: { type: 'orther' },
      },
      {
        path: 'users',
        name: 'usersMain',
        component: require('@/pages/index/innerRouter').default,
        meta: { type: 'orther' },
        children: [
          {
            path: '/',
            name: 'users',
            component: require('@/pages/admin/users/index').default,
            meta: { type: 'orther/users' },
          },
          {
            path: 'info',
            name: 'usersInfo',
            component: require('@/pages/admin/users/detail').default,
            meta: { type: 'orther/users/info' },
          }
        ]
      },
      {
        path: 'custom',
        name: 'customMain',
        component: require('@/pages/index/innerRouter').default,
        meta: { type: 'orther' },
        children: [
          {
            path: '/',
            name: 'custom',
            component: require('@/pages/admin/custom/index').default,
            meta: { type: 'orther' },
          },
          {
            path: 'create',
            name: 'customCreate',
            component: require('@/pages/admin/custom/create').default,
            meta: { type: 'orther' },
          },
          {
            path: 'account',
            name: 'customAccount',
            component: require('@/pages/admin/custom/account').default,
            meta: { type: 'orther' },
          },
          {
            path: 'apply',
            name: 'customApply',
            component: require('@/pages/admin/custom/apply').default,
            meta: { type: 'orther' },
          },
          {
            path: 'authorizeType',
            name: 'customAuthorizeType',
            component: require('@/pages/admin/custom/authorizeType').default,
            meta: { type: 'orther' },
          },
          {
            path: 'authorize',
            name: 'customAuthorize',
            component: require('@/pages/admin/custom/authorize').default,
            meta: { type: 'orther' },
          },
          {
            path: 'authorizeList',
            name: 'customAuthorizeList',
            component: require('@/pages/admin/custom/authorizeList').default,
            meta: { type: 'orther' },
          },
          {
            path: 'approve',
            name: 'customApprove',
            component: require('@/pages/admin/custom/approve').default,
            meta: { type: 'orther' },
          }
        ]
      },
      {
        path: 'content',
        name: 'contentMain',
        component: require('@/pages/index/innerRouter').default,
        meta: { type: 'orther' },
        children: [
          {
            path: '/',
            name: 'contentManagement',
            component: require('@/pages/admin/content/index').default
          },
          {
            path: 'list',
            name: 'contentList',
            component: require('@/pages/admin/content/list').default
          },
          {
            path: 'detail',
            name: 'contentDetail',
            component: require('@/pages/admin/content/detail').default
          }
        ]
      },
      {
        path: 'operate',
        name: 'operate',
        component: require('@/pages/admin/operate').default,
        meta: { type: 'orther' },
      }
    ]
  }
]
