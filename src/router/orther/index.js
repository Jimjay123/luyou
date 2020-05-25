export default [{
    path: '/orther',
    name: 'orther',
    component: require('@/pages/orther/orther').default,
    meta: {
      type: "orther"
    },
    children: []
  },
  {
    path: '/orthers',
    name: 'orthers',
    component: require('@/pages/orther/orthers').default,
    meta: {
      type: "orther"
    },
    children: []
  },
]
