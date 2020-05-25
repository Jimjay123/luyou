export default [{
    path: '/stuNotice',
    name: 'stuNotice',
    component: require('../../pages/notice/All.vue').default,
    meta: {
      type: 'student'
    }
  },
  {
    path: '/teaNotice',
    name: 'teaNotice',
    component: require('../../pages/notice/All.vue').default,
    meta: {
      type: 'teachers'
    }
  },
  {
    path: '/creatorNotice',
    name: 'creatorNotice',
    component: require('../../pages/notice/Alls.vue').default,
    meta: {
      type: 'teachers'
    }
  },

]
