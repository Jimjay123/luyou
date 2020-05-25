export default [
  {
    //群组管理
    path: '/group',
    name: 'group',
    component: require('@/pages/group').default,
    meta: { type: 'teachers' },
    //redirect: 'group/list',
    children: [
      {
        //群组列表
        path: 'list',
        name: 'list',
        component: require('@/pages/group/list').default,
        meta: { type: 'teachers' },
        children: [
          {
            //创建群组
            path: 'add',
            name: 'add',
            component: require('@/pages/group/add.vue').default,
            meta: { type: 'teachers' }
          },
          {
            //群设置
            path: 'info',
            name: 'info',
            component: require('@/pages/group/info.vue').default,
            meta: { type: 'teachers' },
            children: [
              {
                //邀请群成员
                path: 'invite',
                name: 'invite',
                component: require('@/pages/group/invite.vue').default,
                meta: { type: 'teachers' }
              }
            ]
          },
          {
            //群修改
            path: 'edit',
            name: 'edit',
            component: require('@/pages/group/edit.vue').default,
            meta: { type: 'teachers' },
            children: [
              {
                //删除群成员
                path: 'delete',
                name: 'delete',
                component: require('@/pages/group/delete.vue').default,
                meta: { type: 'teachers' },
              },
              {
                //解散群组
                path: 'dismiss',
                name: 'dismiss',
                component: require('@/pages/group/dismiss.vue').default,
                meta: { type: 'teachers' },
              },
              {
                //删除撤回
                path: 'recall',
                name: 'recall',
                component: require('@/pages/group/recall.vue').default,
                meta: { type: 'teachers' },
              }
            ]
          },
          {
            //邀请群成员
            path: 'invite',
            name: 'invite',
            component: require('@/pages/group/invite.vue').default,
            meta: { type: 'teachers' },
          },
          {
            //群成员管理
            path: 'manage',
            name: 'manage',
            component: require('@/pages/home/login.vue').default,
            meta: { type: 'teachers' },
            children: [
              {
                //邀请群成员
                path: 'invite',
                name: 'invite',
                component: require('@/pages/group/invite.vue').default,
                meta: { type: 'teachers' },
              }
            ]
          }
        ]
      },
      {
        //群通知
        path: 'notice',
        name: 'notice',
        component: require('@/pages/notice/Group.vue').default,
        meta: { type: 'teachers' },
      },
    ]
  },
  {
    //群统计分析--标准课
    path: '/groupStaAnalysis',
    name: 'groupStaAnalysis',
    component: require('@/pages/groupStaAnalysis/groupStaAnalysis.vue').default,
    meta: { type: 'teachers' }
  }
]
