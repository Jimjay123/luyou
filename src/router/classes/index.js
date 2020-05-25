export default [
  {
    path: '/class',
    name: 'class',
    component: require('@/pages/classes').default,
    redirect: '/class/resource',
    meta: { type: 'login' },
    children: [
      {
        path: 'resource',
        name: 'resource',
        component: require('@/pages/classes/resources').default
      },
      {
        path: 'create',
        name: 'create',
        component: require('@/pages/classes/create').default,
        redirect: '/class/create/step1',
        children: [
          {
            path: 'step1',
            name: 'step1',
            component: require('@/pages/classes/step1').default
          },
          {
            path: 'step2',
            name: 'step2',
            component: require('@/pages/classes/step2').default
          }
        ]
      },
      {
        path: 'draft',
        name: 'draft',
        component: require('@/pages/classes/draft').default
      },
      {
        path: 'report',
        name: 'report',
        component: require('@/pages/classes/report').default
      },
      {
        path: 'detail',
        name: 'detail',
        component: require('@/pages/classes/detail.vue').default
      },
      {
        path: 'timetable',
        name: 'timetable',
        component: require('@/pages/classes/timetable').default
      },
      {
        path: 'course',
        name: 'course',
        component: require('@/pages/classes/course').default
      }
    ]
  }
]
