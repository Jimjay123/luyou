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
    coursePlanName:'',//新建课程名称
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
    coursePlanName(state){
      if(sessionStorage.getItem('coursePlanName')){
        state.coursePlanName=sessionStorage.getItem('coursePlanName'); //从sessionStorage中读取状态
      }
      return state.coursePlanName;
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
    coursePlanNameMut(state,item){
      state.coursePlanName=item.coursePlanName;
      sessionStorage.setItem('coursePlanName',item.coursePlanName);
    },
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
    coursePlanNameHandle(context,item) {
      context.commit('coursePlanNameMut',item);
    },
  }
}
