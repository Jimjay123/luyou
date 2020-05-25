export default [{ //专业老师端
    path: '/teacher',
    name: 'teacher',
    component: require('@/pages/teacher/teacher.vue').default,
    meta: {
      type: "teachers"
    },
    //redirect: 'teacherMain/Uncertified',
    children: [{ //未认证
        path: 'Uncertified',
        name: 'Uncertified',
        component: require('@/pages/home/login.vue').default,
        meta: {
          type: "teachers"
        },
      },
      // { //已认证
      //   path: 'attestation',
      //   name: 'attestation',
      //   component: require('@/pages/home/login.vue').default,
      //   meta: {
      //     type: "teachers"
      //   },
      // },
      { //个人信息
        path: 'personalInfo',
        name: 'personalInfo',
        component: require('@/pages/home/login.vue').default,
      },
      { //个人信息--编辑
        path: 'personalInfoEdit',
        name: 'personalInfoEdit',
        component: require('@/pages/home/login.vue').default,
      },
      { //专业老师认证
        path: 'personalInfoEdit',
        name: 'personalInfoEdit',
        component: require('@/pages/home/login.vue').default,
        redirect: 'personalInfoEdit/baseInfo',
        children: [{ //基本信息
            path: 'baseInfo',
            name: 'baseInfo',
            component: require('@/pages/home/login.vue').default,
          },
          { //认证信息
            path: 'attestationInfo',
            name: 'attestationInfo',
            component: require('@/pages/home/login.vue').default,
          },
          { //提交成功
            path: 'success',
            name: 'success',
            component: require('@/pages/home/login.vue').default,
          }
        ]
      },
    ]
  },
  { //我的课程计划
    path: '/myCourse',
    name: 'myCourse',
    component: require('@/pages/home/login.vue').default,
  },
  { //创建课程计划
    path: '/create',
    name: 'create',
    component: require('@/pages/home/login.vue').default,
    children: [{ //创建成功
      path: 'success',
      name: 'success',
      component: require('@/pages/home/login.vue').default,
    }]
  },
  { //编辑课程计划
    path: '/edit',
    name: 'edit',
    component: require('@/pages/home/login.vue').default,
    redirect: 'teacherMain/Uncertified',
    children: [{ //创建标准课
        path: 'createClass',
        name: 'createClass',
        component: require('@/pages/home/login.vue').default,
      },
      { //添加标准课
        path: 'addClass',
        name: 'addClass',
        component: require('@/pages/home/login.vue').default,
      },
      { //添加标准课success
        path: 'addSuccess',
        name: 'addSuccess',
        component: require('@/pages/home/login.vue').default,
      },
      { //删除标准课
        path: 'delClass',
        name: 'delClass',
        component: require('@/pages/home/login.vue').default,
      }
    ]
  },
  { //下一步--发布
    path: '/next',
    name: 'next',
    component: require('@/pages/home/login.vue').default,
  },
  { //预览
    path: '/create',
    name: 'create',
    component: require('@/pages/home/login.vue').default,
  },
  { //课程频道详情
    path: '/classChannelInfo',
    name: 'classChannelInfo',
    component: require('@/pages/home/login.vue').default,
    redirect: 'teacherMain/Uncertified',
    children: [{ //课程详情
        path: '/class',
        name: 'class',
        component: require('@/pages/home/login.vue').default,
      },
      { //课程频道详情
        path: '/channel',
        name: 'channel',
        component: require('@/pages/home/login.vue').default,
      },
    ]
  },
  { //课程计划--基础设置
    path: '/create',
    name: 'create',
    component: require('@/pages/home/login.vue').default,
  },
  { //课程频道分析
    path: '/create',
    name: 'create',
    component: require('@/pages/home/login.vue').default,
  },
  { //老师端--统计分析
    path: '/teacherCensus',
    name: 'teacherCensus',
    component: require('@/pages/home/login.vue').default,
  },
  { //通知消息--
    path: '/globalNotice',
    name: 'globalNotice',
    component: require('@/pages/home/login.vue').default,
    redirect: 'teacherMain/Uncertified',
    children: [{ //system消息
      path: '/system',
      name: 'system',
      component: require('@/pages/home/login.vue').default,
    }]
  },
]
