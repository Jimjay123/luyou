export default [{
    path: '/main',
    name: 'main',
    component: require('@/pages/home/mainNosign').default,
    meta: {
      type: 'login'
    },
    children: [{
        path: 'login',
        name: 'login',
        component: require('@/pages/home/login.vue').default,
        meta: {
          type: 'login'
        }
      },
      {
        path: 'pasLogin',
        name: 'pasLogin',
        component: require('@/pages/home/pasLogin.vue').default,
        meta: {
          type: 'login'
        }
      },
      {
        path: 'forget',
        name: 'forget',
        component: require('@/pages/home/forget.vue').default,
        meta: {
          type: 'login'
        }
      },
      {
        path: 'resetPassword',
        name: 'resetPassword',
        component: require('@/pages/home/resetPassword.vue').default,
        meta: {
          type: 'login'
        }
      },
      {
        path: 'wechatLogin',
        name: 'wechatLogin',
        component: require('@/pages/home/wechatLogin.vue').default,
        meta: {
          type: 'login'
        }
      }
    ]
  },
  {
    path: '/loginSuccess',
    name: 'loginSuccess',
    component: require('@/pages/home/loginSuccess').default,
    meta: {
      type: 'login'
    },
  },
  // {
  //   path: '/aboutLuyouor',
  //   name: 'aboutLuyouor',
  //   component: require('@/pages/home/aboutLuyouor').default,
  //   meta: {
  //     type: 'login'
  //   },
  // }
]
