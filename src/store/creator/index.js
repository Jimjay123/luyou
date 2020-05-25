export default {
  namespaced: true,
  state: {
    userList: {},
    courseList: [{
        icon1: require('../../assets/creator/icon-book.svg'),
        icon2: require('../../assets/creator/book-active.svg'),
        title: '我的创作',
        isOpen: true,
        url: '/creator/home',
        query: '',
        show: false,
        children: [{
            icon1: require('../../assets/creator/icon-course.svg'),
            icon2: require('../../assets/creator/icon-course.svg'),
            title: '新建课程',
            isOpen: true,
            url: '/editor',
            query: ''
          },
          {
            icon1: require('../../assets/creator/icon-channel.svg'),
            icon2: require('../../assets/creator/icon-channel.svg'),
            title: '新建课程频道',
            isOpen: true,
            url: '/creatorCreCouPlans',
            query: '',
            tem: '模板'
          },
          {
            icon1: require("../../assets/creator/icon-upload.svg"),
            icon2: require("../../assets/creator/icon-upload.svg"),
            title: "标准课（沙盘）",
            isOpen: true,
            url: "/sandTablestandard",
            query: ""
          },
          {
            icon1: require("../../assets/creator/icon-upload.svg"),
            icon2: require("../../assets/creator/icon-upload.svg"),
            title: "课程频道（沙盘）",
            isOpen: true,
            url: "/sandTable",
            query: ""
          },
          {
            icon1: require('../../assets/creator/icon-upload.svg'),
            icon2: require('../../assets/creator/icon-upload.svg'),
            title: '上传课程',
            isOpen: true,
            url: '/creator/home/uploadFile',
            query: ''
          }
        ]
      },
      {
        icon1: require('../../assets/creator/icon-time.svg'),
        icon2: require('../../assets/creator/time-active.svg'),
        title: '转审课程',
        isOpen: true,
        url: '/creator/transferCourse',
        query: ''
      },
      {
        icon1: require('../../assets/creator/icon-time.svg'),
        icon2: require('../../assets/creator/time-active.svg'),
        title: '最近修改',
        isOpen: true,
        url: '/creator/recEdit',
        query: ''
      },
      {
        icon1: require('../../assets/creator/icon-recycle.svg'),
        icon2: require('../../assets/creator/recycle-active.svg'),
        title: '回收站',
        isOpen: true,
        url: '/creator/recycle',
        query: ''
      }
    ], //左侧导航栏 我的课程
    otherList: [{
        icon1: require('../../assets/creator/icon-user.svg'),
        icon2: require('../../assets/creator/user-active.svg'),
        title: '个人中心',
        isOpen: true,
        url: '/creator/creatorpersonal',
        query: ''
      },
      {
        icon1: require('../../assets/creator/icon-msg.svg'),
        icon2: require('../../assets/creator/msg-active.svg'),
        title: '消息中心',
        count: '100',
        isOpen: true,
        url: '/creator/creatorNotice',
        query: ''
      },
      // {
      //   icon1: require('../../assets/creator/icon-setUp.svg'),
      //   icon2: require('../../assets/creator/setUp-active.svg'),
      //   title: '账号设置',
      //   isOpen: true, //是否开放 true 是 false 否
      //   url: '',
      //   query: ''
      // },
      {
        icon1: require('../../assets/creator/icon-quest.svg'),
        icon2: require('../../assets/creator/icon-quest.svg'),
        title: '问答消息',
        isOpen: false, //是否开放 true 是 false 否
        url: '',
        query: ''
      },
      {
        icon1: require('../../assets/creator/icon-extend.svg'),
        icon2: require('../../assets/creator/icon-extend.svg'),
        title: '业绩推广',
        isOpen: false, //是否开放 true 是 false 否
        url: '',
        query: ''
      },
      {
        icon1: require('../../assets/creator/icon-cust.svg'),
        icon2: require('../../assets/creator/icon-cust.svg'),
        title: '客服支持',
        isOpen: false, //是否开放 true 是 false 否
        url: '',
        query: ''
      }
    ], //左侧导航栏 其他功能
    tab: '我的创作', //左侧导航栏 选中项

    //创建课程频道
    creatorClassList: [], //新增课程模板列表

    creatorChannel: {
      planId: '',
      planName: '' //
    }, //当前频道数据
    creatorModifyDateTime: {
      modifyDatetime: ''
    },
    creatorDelDate: {}, //点击删除 获取数据
    creatorDelCourse: {
      show: false, //提示框是否显示
      index: '', //下标
      data: {} //被删除的数据
    }, //已删除课程--信息
    creatorCoursePlanName: '', //新建课程名称
    systemIndex: 'show', //show 显示 hide 隐藏
    creList: [], //primary list 数据
    uploadFileShow: false //上传文件弹框显示隐藏
  },
  getters: {
    //实时监听 state 值的变化
    userList(state) {
      return state.userList
    },
    courseList(state) {
      return state.courseList
    },
    otherList(state) {
      return state.otherList
    },
    tab(state) {
      return state.tab
    },

    creatorClassList(state) {
      return state.creatorClassList
    },
    creatorDelCourse(state) {
      return state.creatorDelCourse
    },
    creatorChannel(state) {
      return state.creatorChannel
    },
    creatorDelDate(state) {
      return state.creatorDelDate
    },
    creatorModifyDateTime(state) {
      return state.creatorModifyDateTime
    },
    creatorCoursePlanName(state) {
      if (sessionStorage.getItem('creatorCoursePlanName')) {
        state.creatorCoursePlanName = sessionStorage.getItem(
          'creatorCoursePlanName'
        ) //从sessionStorage中读取状态
      }
      return state.creatorCoursePlanName
    },
    systemIndex(state) {
      if (sessionStorage.getItem('systemIndex')) {
        state.systemIndex = sessionStorage.getItem('systemIndex') //从sessionStorage中读取状态
      }
      return state.systemIndex
    },
    creList(state) {
      return state.creList
    },
    uploadFileShow(state) {
      if (sessionStorage.getItem('uploadFileShow')) {
        state.uploadFileShow =
          sessionStorage.getItem('uploadFileShow') === 'false' ? false : true //从sessionStorage中读取状态
      }
      return state.uploadFileShow
    }
  },
  mutations: {
    // 改变state 值触发方法
    userListMut(state, item) {
      state.userList = item
    },
    courseListMut(state, item) {
      state.courseList = [...item.courseList]
    },
    otherListMut(state, item) {
      state.otherList = [...item.otherList]
    },
    tabMut(state, item) {
      state.tab = item.tab
    },
    creatorClassListMut(state, item) {
      state.creatorClassList = [...item.creatorClassList]
    },
    creatorDelCourseMut(state, item) {
      state.creatorDelCourse = {
        ...item.creatorDelCourse
      }
    },
    creatorChannelMut(state, item) {
      state.creatorChannel = {
        ...item.creatorChannel
      }
    },
    creatorCoursePlanNameMut(state, item) {
      state.creatorCoursePlanName = item.creatorCoursePlanName
      sessionStorage.setItem(
        'creatorCoursePlanName',
        item.creatorCoursePlanName
      )
    },
    creatorDelDateMut(state, item) {
      state.creatorDelDate = {
        ...item.creatorDelDate
      }
    },
    creatorModifyDateTimeMut(state, item) {
      state.creatorModifyDateTime = {
        ...item.creatorModifyDateTime
      }
    },
    systemIndexMut(state, item) {
      state.systemIndex = item.systemIndex
      sessionStorage.setItem('systemIndex', item.systemIndex)
    },
    creListMut(state, item) {
      state.creList = [...item.creList]
    },
    uploadFileShowMut(state, item) {
      state.uploadFileShow = item.uploadFileShow
      sessionStorage.setItem('uploadFileShow', item.uploadFileShow)
    }
  },
  actions: {
    userListHandle(context, item) {
      context.commit('userListMut', item)
    },
    courseListHandle(context, item) {
      context.commit('courseListMut', item)
    },
    otherListHandle(context, item) {
      context.commit('otherListMut', item)
    },
    tabHandle(context, item) {
      context.commit('tabMut', item)
    },
    creatorClassListHandle(context, item) {
      context.commit('creatorClassListMut', item)
    },
    creatorDelCourseHandle(context, item) {
      context.commit('creatorDelCourseMut', item)
    },
    creatorChannelHandle(context, item) {
      context.commit('creatorChannelMut', item)
    },
    creatorCoursePlanNameHandle(context, item) {
      context.commit('creatorCoursePlanNameMut', item)
    },
    creatorDelDateHandle(context, item) {
      context.commit('creatorDelDateMut', item)
    },
    creatorModifyDateTimeHandle(context, item) {
      context.commit('creatorModifyDateTimeMut', item)
    },
    systemIndexHandle(context, item) {
      context.commit('systemIndexMut', item)
    },
    creListHandle(context, item) {
      context.commit('creListMut', item)
    },
    uploadFileShowHandle(context, item) {
      context.commit('uploadFileShowMut', item)
    }
  }
}
