export default [
  {
    //学生端
    path: '/student',
    name: 'student',
    component: require('@/pages/student').default,
    meta: {
      type: 'student'
    },
    children: [
      {
        //学生端--个人中心
        path: 'ncesCenter',
        name: 'ncesCenter',
        component: require('@/pages/student/ncesCenter').default,
        meta: {
          type: 'student'
        }
      },
      {
        //学生端--系统消息
        path: 'studentGlobalNotice',
        name: 'studentGlobalNotice',
        component: require('@/pages/student/studentGlobalNotice').default,
        meta: {
          type: 'student'
        }
      },
      {
        //学生端--我的群组--列表页
        path: 'studentList',
        name: 'studentList',
        component: require('@/pages/student/studentList.vue').default,
        meta: {
          type: 'student'
        },
        children: [
          {
            path: 'stuInfo',
            name: 'stuInfo',
            component: require('@/pages/student/stuInfo.vue').default,
            meta: {
              type: 'student'
            },
            children: [
              {
                path: 'exitGroup',
                name: 'exitGroup',
                component: require('@/pages/student/exitGroup.vue').default,
                meta: {
                  type: 'student'
                }
              },
              {
                path: 'stuInvite',
                name: 'stuInvite',
                component: require('@/pages/student/stuInvite.vue').default,
                meta: {
                  type: 'student'
                }
              }
            ]
          },
          {
            //学生端--加入群组弹框
            path: 'entryGroup',
            name: 'entryGroup',
            component: require('@/pages/student/entryGroup').default,
            meta: {
              type: 'student'
            }
          }
        ]
      }
    ]
  },

  {
    //学生端--认证信息
    path: '/studentAttestation',
    name: 'studentaAttestation',
    component: require('@/pages/teachers/studentAttestation').default,
    meta: {
      type: 'authentication'
    }
  },
  // 链接进入
  {
    path: '/StudentLinkTo',
    name: 'StudentLinkTo',
    component: require('../../pages/student/StudentLinkTo.vue').default,
    meta: {
      type: 'orther'
    }
  },
  {
    path: '/StudentMain',
    name: 'StudentMain',
    component: require('../../pages/student/StudentMain.vue').default,
    meta: {
      type: 'student'
    }
  },
  {
    path: '/personals',
    name: 'personals',
    component: require('../../pages/student/personals.vue').default,
    meta: {
      type: 'student'
    }
  },
  {
    path: '/StudentCour',
    name: 'StudentCour',
    component: require('../../pages/student/StudentCour.vue').default,
    meta: {
      type: 'student'
    }
  },
  {
    path: '/StudentStandard',
    name: 'StudentStandard',
    component: require('../../pages/student/StudentStandard.vue').default,
    meta: {
      type: 'student'
    }
  },
  {
    path: '/StudentChannel',
    name: 'StudentChannel',
    component: require('../../pages/student/StudentChannel.vue').default,
    meta: {
      type: 'student'
    }
  },
  {
    path: '/StudentReports', //学生 我的课程 查看报告
    name: 'StudentReports',
    component: require('../../pages/student/StudentReports.vue').default,
    meta: {
      type: 'student'
    }
  },
  {
    path: '/StudentReportsChannel', //学生 我的课程 查看报告
    name: 'StudentReportsChannel',
    component: require('../../pages/student/StudentReportsChannel.vue').default,
    meta: {
      type: 'student'
    }
  },
  {
    // 沙盘课程频道-去学习
    path: '/stGoStudy',
    name: 'stGoStudy',
    component: require('../../pages/Student/stGoStudy.vue').default,
    meta: {
      type: 'student'
    }
  }
]
