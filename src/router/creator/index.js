export default [{
    path: '/creator',
    name: 'creator',
    component: require('@/pages/creator').default,
    meta: {
      type: 'creator'
    },
    redirect: '/creator/home',
    children: [{
        //
        path: 'home',
        name: 'creatorHome',
        component: require('@/pages/creator/home').default,
        meta: {
          type: 'creator'
        },
        children: [{
          path: 'uploadFile',
          name: 'uploadFile',
          component: require('@/pages/creator/uploadFile').default,
          meta: {
            type: 'creator'
          }
        }]
      },
      {
        path: 'recycle',
        name: 'recycle',
        component: require('@/pages/creator/recycle').default,
        meta: {
          type: 'creator'
        }
      },
      {
        path: 'transferCourse',
        name: 'transferCourse',
        component: require('@/pages/creator/transferCourse').default,
        meta: {
          type: 'creator'
        }
      },
      {
        path: 'recEdit',
        name: 'recEdit',
        component: require('@/pages/creator/recEdit').default,
        meta: {
          type: 'creator'
        }
      },
      {
        path: 'creatorpersonal',
        name: 'creatorpersonal',
        component: require('@/pages/creator/creatorpersonal').default,
        meta: {
          type: 'creator'
        }
      },
      {
        path: 'creatorNotice',
        name: 'creatorNotice',
        component: require('@/pages/creator/creatorNotice').default,
        meta: {
          type: 'creator'
        }
      },
      {
        //个人中心
        path: 'perCenter',
        name: 'perCenter',
        component: require('@/pages/creator/home').default,
        meta: {
          type: 'creator'
        },
        children: []
      },
      {
        path: 'create',
        name: 'creatorCreate',
        component: require('@/pages/creator/create').default,
        meta: {
          type: 'creator'
        },
        redirect: '/creator/create/microClass',
        children: [{
            path: 'microClass',
            name: 'micro',
            meta: {
              type: 'micro'
            }
          },
          {
            path: 'xapi',
            name: 'xapi',
            meta: {
              type: 'xapi'
            }
          },
          {
            path: 'html',
            name: 'html',
            meta: {
              type: 'html'
            }
          }
        ]
      },
      {
        path: 'plan',
        name: 'creatorPlan',
        component: require('@/pages/creator/plan').default,
        meta: {
          type: 'creator'
        }
      }
    ]
  },
  {
    //课程频道--基础信息设置
    path: '/classInfoBase',
    name: 'classInfoBase',
    component: require('@/pages/creator/baseSet/index').default,
    meta: {
      type: 'creator'
    }
  },
  {
    //标准课--基础信息设置
    path: '/classCourseInfo',
    name: 'classCourseInfo',
    component: require('@/pages/creator/baseSet/classCourseInfo').default,
    meta: {
      type: 'creator'
    }
  },
  {
    path: '/creatorCreCouPlans',
    name: 'creatorCreCouPlans',
    component: require('@/pages/creatorCreCouPlans/index').default,
    meta: {
      type: 'creator'
    },
    children: [{
      //创建课程计划--添加标准课
      path: 'primary',
      name: 'primary',
      component: require('@/pages/creatorCreCouPlans/primary').default,
      meta: {
        type: 'creator'
      }
    }]
  },
  {
    path: '/editor',
    name: 'editor',
    component: require('@/pages/creator/editor/index').default,
    meta: {
      type: 'creator'
    }
  },
  {
    // 沙盘课程频道
    path: '/sandTable',
    name: 'sandTable',
    component: require('@/pages/creator/sandTable/index').default,
    meta: {
      type: 'creator'
    }
  },
  {
    // 沙盘课程频道-预览页
    path: '/sandTablePreview',
    name: 'sandTablePreview',
    component: require('@/pages/creator/sandTablePreview/index').default,
    meta: {
      type: 'orther'
    }
  },
  {
    //沙盘课程--课程频道预览
    path: '/sanTabChaPreview',
    name: 'sanTabChaPreview',
    component: require('@/pages/creator/sanTabChaPreview/sanTabChaPreview')
      .default,
    meta: {
      type: 'creator'
    },
    children: [{
      path: 'report',
      name: 'report',
      component: require('@/pages/creator/sandTableReport/sandTableReport')
        .default,
      meta: {
        type: 'creator'
      }
    }]
  },
  {
    path: '/sandTablestandard',
    name: 'sandTablestandard',
    component: require('@/pages/creator/sandTablestandard/index').default,
    meta: {
      type: 'creator'
    }
  },
  {
    path: '/previewMain',
    name: 'previewMain',
    component: require('@/pages/creator/sandTablestandard/previewMain').default,
    meta: {
      type: 'orther'
    }
  },
  {
    path: '/pptPreview',
    name: 'pptPreview',
    component: require('@/pages/creator/editor/pptPreview').default,
    meta: {
      type: 'orther'
    }
  },
  {
    path: '/npePreview',
    name: 'npePreview',
    component: require('@/pages/creator/editor/npePreview').default,
    meta: {
      type: 'creator'
    }
  },
  {
    path: '/creatorChannel',
    name: 'creatorChannel',
    component: require('../../pages/creatorChannel/index.vue').default,
    meta: {
      type: 'creator'
    }
  },
  {
    path: '/creatorStandard',
    name: 'creatorStandard',
    component: require('../../pages/creatorStandard/index.vue').default,
    meta: {
      type: 'creator'
    }
  },
  {
    path: '/creatorPreview',
    name: 'creatorPreview',
    component: require('../../pages/creatorCreCouPlans/creatorPreview.vue')
      .default,
    meta: {
      type: 'creator'
    }
  }
]
