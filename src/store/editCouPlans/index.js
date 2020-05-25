export default {
  namespaced:true,
  state: {
    templateList:[],//新增课程模板列表

    channel:{
      planId:'',
      planName:'',//
    },//当前频道数据

    delCourse:{
      show:false,//提示框是否显示
      index:'',//下标
      data:{},//被删除的数据
    },//已删除课程--信息

    editOrAdd: {
      addCourseType:'',//当前页面来源  addNew新建  editTem  模版新建   edit  编辑
      courseChannelId: '',//模版频道 id
      coursePlanId: '',//模板下一步成功后生成的 新id
      relCourseId:'',//单一标准课ID
    },
  },
  getters: {//实时监听 state 值的变化
    templateList(state){
      return state.templateList;
    },
    delCourse(state){
      return state.delCourse;
    },
    channel(state){
      return state.channel;
    },
    editOrAdd(state){
      return state.editOrAdd;
    },
  },
  mutations:{// 改变state 值触发方法
    templateListMut(state,item){
      state.templateList=[...item.templateList];
    },
    delCourseMut(state,item){
      state.delCourse={...item.delCourse};
    },
    channelMut(state,item){
      state.channel={...item.channel};
    },
    editOrAddMut(state,item){
      state.editOrAdd=item.editOrAdd;
    }
  },
  actions:{
    templateListHandle(context,item) {
      context.commit('templateListMut',item);
    },
    delCourseHandle(context,item) {
      context.commit('delCourseMut',item);
    },
    channelHandle(context,item) {
      context.commit('channelMut',item);
    },
    editOrAddHandle(context,item){
      context.commit('editOrAddMut',item);
    }
  }
}
