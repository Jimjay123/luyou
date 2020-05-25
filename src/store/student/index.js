export default {
  namespaced: true,
  state: {
    groupList: [], //群组列表
    selGroup: {}, //当前选中的群组
    groCenInfo: {}, //当前选中群的统计信息
    groCouList: [], //当前选中群所有课程
    groMemList: [], //当前群所有成员数组
    isNotice: false, //查看入群申请
    stChannelList: {}, //学生沙盘课程频道数据

    //分页数据
    page: '1', //当前页
    limit: '28', //每页条数
    total: '0', //总条数

    tabType: 'all', //list页tab 类型 全部  all 全部 finish 已完成  remain 未完成

    delStuId: {
      groupId: '',
      memberId: '',
      show: false //被删除后 撤回提示框 true 显示 false 隐藏
    } //删除学生id
  },
  getters: {
    //实时监听 state 值的变化
    groupList(state) {
      return state.groupList
    },
    selGroup(state) {
      return state.selGroup
    },
    stChannelList(state) {
      return state.stChannelList
    },
    isNotice(state) {
      return state.isNotice
    },
    groCenInfo(state) {
      return state.groCenInfo
    },
    groCouList(state) {
      return state.groCouList
    },
    page(state) {
      return state.page
    },
    limit(state) {
      return state.limit
    },
    total(state) {
      return state.total
    },
    tabType(state) {
      return state.tabType
    },
    groMemList(state) {
      return state.groMemList
    },
    delStuId(state) {
      return state.delStuId
    }
  },
  mutations: {
    // 改变state 值触发方法
    groupListMut(state, item) {
      state.groupList = [...item.groupList]
    },
    selGroupMut(state, item) {
      state.selGroup = { ...item.selGroup }
      state.isNotice = false
    },
    stChannelListMut(state, item) {
      state.stChannelList = { ...item.stChannelList }
      state.isNotice = false
    },
    selNoticeMut(state) {
      state.isNotice = true
    },
    groCenInfoMut(state, item) {
      state.groCenInfo = { ...item.groCenInfo }
    },
    groCouListMut(state, item) {
      state.groCouList = [...item.groCouList]
    },
    pageMut(state, item) {
      state.page = item.page
    },
    limitMut(state, item) {
      state.limit = item.limit
    },
    totalMut(state, item) {
      state.total = item.total
    },
    tabTypeMut(state, item) {
      state.tabType = item.tabType
    },
    groMemListMut(state, item) {
      state.groMemList = [...item.groMemList]
    },
    delStuIdMut(state, item) {
      state.delStuId = { ...item.delStuId }
    }
  },
  actions: {
    groupListHandle(context, item) {
      context.commit('groupListMut', item)
    },
    selGroupHandle(context, item) {
      context.commit('selGroupMut', item)
    },
    stChannelListHandle(context, item) {
      context.commit('stChannelListMut', item)
    },
    selNoticeHandle(context, item) {
      context.commit('selNoticeMut', item)
    },
    groCenInfoHandle(context, item) {
      context.commit('groCenInfoMut', item)
    },
    groCouListHandle(context, item) {
      context.commit('groCouListMut', item)
    },
    pageHandle(context, item) {
      context.commit('pageMut', item)
    },
    limitHandle(context, item) {
      context.commit('limitMut', item)
    },
    totalHandle(context, item) {
      context.commit('totalMut', item)
    },
    tabTypeHandle(context, item) {
      context.commit('tabTypeMut', item)
    },
    groMemListHandle(context, item) {
      context.commit('groMemListMut', item)
    },
    delStuIdHandle(context, item) {
      context.commit('delStuIdMut', item)
    }
  }
}
