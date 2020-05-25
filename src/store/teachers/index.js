export default {
  namespaced: true,
  state: {
    editOrAdd: {
      addCourseType: '', //当前页面来源  addNew新建  editTem  模版新建   edit  编辑
      courseChannelId: '', //模版频道 id
      coursePlanId: '', //模板下一步成功后生成的 新id
      relCourseId: '' //单一标准课ID
    },
    previewList: {} //老师端沙盘课程预览
  },
  getters: {
    //实时监听 state 值的变化
    editOrAdd(state) {
      return state.editOrAdd
    },
    previewList(state) {
      return state.previewList
    }
  },
  mutations: {
    // 改变state 值触发方法
    editOrAddMut(state, item) {
      state.editOrAdd = item.editOrAdd
    },
    previewListMut(state, item) {
      state.previewList = item.previewList
    }
  },
  actions: {
    editOrAddHandle(context, item) {
      context.commit('editOrAddMut', item)
    },
    previewListHandle(context, item) {
      context.commit('previewListMut', item)
    }
  }
}
