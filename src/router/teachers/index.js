export default [
  {
    path: '/teachers',
    name: 'teachers',
    component: require('@/pages/teachers').default,
    meta: {
      type: 'teachers'
    },
    children: [
      {
        //我的课程计划
        path: 'CoursePlan',
        name: 'CoursePlan',
        component: require('../../pages/Courseplan/Courseplan.vue').default,
        meta: {
          type: 'teachers'
        }
      },
      {
        //创建课程计划
        path: 'Establish',
        name: 'Establish',
        component: require('../../pages/Establish/Establish.vue').default,
        meta: {
          type: 'teachers'
        }
      },
      {
        //创建课程计划--章节编辑--新增
        path: 'creCouPlans',
        name: 'creCouPlans',
        component: require('@/pages/creCouPlans/index.vue').default,
        meta: {
          type: 'teachers'
        },
        children: [
          {
            //创建课程计划--添加标准课
            path: 'primary',
            name: 'primary',
            component: require('@/pages/teachers/primary').default,
            meta: {
              type: 'teachers'
            }
          }
        ]
      },
      {
        //添加课程--基本信息设置--新增
        path: 'Addcourse',
        name: 'Addcourse',
        component: require('@/pages/teachers/Addcourse2').default,
        meta: {
          type: 'teachers'
        }
      },
      {
        //创建课程计划--章节编辑--编辑
        path: 'editCouPlans',
        name: 'editCouPlans',
        component: require('@/pages/editCouPlans/index.vue').default,
        meta: {
          type: 'teachers'
        },
        children: [
          {
            //创建课程计划--添加标准课
            path: 'editPrimary',
            name: 'editPrimary',
            component: require('@/pages/editCouPlans/primary.vue').default,
            meta: {
              type: 'teachers'
            }
          }
        ]
      },
      {
        //添加课程--基本信息设置--编辑
        path: 'editCourseBase',
        name: 'editCourseBase',
        component: require('@/pages/editCouPlans/editCourseBase.vue').default,
        meta: {
          type: 'teachers'
        }
      },
      {
        //老师端统计中心
        path: 'content',
        name: 'content',
        component: require('@/pages/teachers/content').default,
        meta: {
          type: 'teachers'
        }
      },
      {
        //老师端--统计中心
        path: 'teaNcesCenter',
        name: 'teaNcesCenter',
        component: require('@/pages/teachers/teaNcesCenter').default,
        meta: {
          type: 'teachers'
        }
      }
    ]
  },
  {
    //老师端身份认证--基础信息
    path: '/teachers/teacherAttestation',
    name: 'teacherAttestation',
    component: require('@/pages/teachers/teacherAttestation').default,
    meta: {
      type: 'authentication'
    }
  },
  {
    //老师端身份认证--身份认证信息
    path: '/teachers/teacherCredentials',
    name: 'teacherCredentials',
    component: require('@/pages/teachers/teacherCredentials').default,
    meta: {
      type: 'authentication'
    }
  },
  {
    //老师端--身份认证成功页面
    path: '/teachers/teacherSubmitted',
    name: 'teacherSubmitted',
    component: require('@/pages/teachers/teacherSubmitted').default,
    meta: {
      type: 'authentication'
    }
  },
  {
    //创作者端--认证信息
    path: '/teachers/createrAttestation',
    name: 'createrAttestation',
    component: require('@/pages/teachers/createrAttestation').default,
    meta: {
      type: 'creater'
    }
  },
  {
    //老师端--沙盘课程频道-预览页
    path: '/teaPreview',
    name: 'teaPreview',
    component: require('@/pages/teachers/teaPreview').default,
    meta: {
      type: 'teachers'
    }
  },

]
