export default [
    {
        path: '/login',
        name: 'login',
        component: require('@/pages/userinfo/login').default,
        meta: { type: 'login' }
    },
    {
        path: '/register',
        name: 'register',
        component: require('@/pages/userinfo/login').default,
        meta: { type: 'register' }
    },
    {
        path: '/forget',
        name: 'forget',
        component: require('@/pages/userinfo/login').default,
        meta: { type: 'forget' }
    },
    {
        path: '/setPwd',
        name: 'setPwd',
        component: require('@/pages/userinfo/login').default,
        meta: { type: 'setPwd' }
    },
    {
        path: '/loginQr',
        name: 'loginQr',
        component: require('@/pages/userinfo/login').default,
        meta: { type: 'loginQr', showQr: true }
    },
    {
        path: '/validMobile',
        name: 'validMobile',
        component: require('@/pages/userinfo/login').default,
        meta: { type: 'validMobile' }
    },
    {
        path: '/bindMobile',
        name: 'bindMobile',
        component: require('@/pages/userinfo/login').default,
        meta: { type: 'bindMobile', showQr: true }
    },
    {
        path: '/releaseMobile',
        name: 'releaseMobile',
        component: require('@/pages/userinfo/login').default,
        meta: { type: 'releaseMobile', showQr: true }
    },
    {
        path: '/userinfo',
        name: 'userinfo',
        component: require('@/pages/userinfo').default,
        children: [
            {
                path: 'detail',
                name: 'userDetail',
                component: require('@/pages/userinfo/detail.vue').default,
            },
            {
                path: 'edit',
                name: 'edit',
                component: require('@/pages/userinfo/edit.vue').default,
            },
            {
                path: 'idCard',
                name: 'idCard',
                component: require('@/pages/userinfo/idCard.vue').default,
            },
            {
                path: 'security',
                name: 'security',
                component: require('@/pages/userinfo/security.vue').default,
            },
            {
                path: 'favor',
                name: 'favor',
                component: require('@/pages/userinfo/favor.vue').default,
            },
            {
                path: '*',
                name: 'none',
                redirect:'detail'
            }
        ]
    }
]
