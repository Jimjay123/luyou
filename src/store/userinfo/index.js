export default {
  namespaced: true,
  state: {
    tips: {
      register: '恭喜您，注册成功！现在开始学习吧！',
      setPwd: '密码重设成功，请重新登录!',
      approve: '认证信息已提交，等待审批。'
    },
    token: '', //登录的token状态
    loading: false, //全局loading显示隐藏控制方法
    ajaxStatus: false, //ajaxStatus 接口加载状态 true 加载中 false 加载完成
    dialog: {
      show: false, //弹框显示隐藏
      type: 'message', //弹框类型 loading全局加载中  fail失败提示信息  success成功提示信息  warning警告提示信息 message 普通提示信息
      btn1: false, //按钮1 默认为false 不显示
      btn2: false, //按钮2 默认false 不显示
      btnText1: '取消', //按钮1 按钮显示文字
      btnText2: '确定', //按钮2 按钮显示文字
      btn1Cb: null, //按钮1 回调方法
      btn2Cb: null, //按钮2 回调方法
      content: '内容', //弹框内容
      time: null, //默认为null 不关闭
      hasMask: true //是否有遮罩层  true 由 false 没有 默认有
    },
    headerTab:1,//首页 1  课程计划 2  我的群组 3  个人中心 4
  },
  getters: {
    //实时监听 state 值的变化
    dialog(state) {
      return state.dialog
    },
    ajaxStatus(state) {
      return state.ajaxStatus
    },
    token(state) {
      return state.token
    },
    loading(state) {
      return state.loading
    },
    headerTab(state) {
      if(sessionStorage.getItem('stateHeaderTab')){
        state.headerTab=sessionStorage.getItem('stateHeaderTab'); //从sessionStorage中读取状态
      }
      return state.headerTab*1
    }
  },
  mutations: {
    // 改变state 值触发方法
    dialogMut(state, item = {}) {
      let options = {
        show: false, //弹框显示隐藏
        type: 'message', //弹框类型 loading全局加载中  fail失败提示信息  success成功提示信息  warning警告提示信息 message 普通提示信息
        btn1: true, //按钮1 默认true 显示
        btn2: true, //按钮2 默认true 显示
        btnText1: '取消', //按钮1 按钮显示文字 按钮在非loading状态下有效
        btnText2: '确定', //按钮2 按钮显示文字
        btn1Cb: null, //按钮1 回调方法
        btn2Cb: null, //按钮2 回调方法
        content: '内容', //弹框内容
        time: null, //默认 2秒后关闭
        hasMask: true //是否有遮罩层  true 由 false 没有 默认有
      }
      state.dialog = { ...options, ...item }
    },
    closeBtn(state, val) {
      state.dialog.show = val
    },
    ajaxStatusMut(state, item = false) {
      state.ajaxStatus = item.ajaxStatus
    },
    tokenMut(state, item) {
      state.token = item.token
    },
    loadingMut(state, item) {
      state.loading = item.loading
    },
    headerTabMut(state, item) {
      state.headerTab = item.headerTab;
      sessionStorage.setItem('stateHeaderTab',item.headerTab);
    }
  },
  actions: {
    dialogHandle(context, item) {
      context.commit('dialogMut', item)
    },
    ajaxStatusHandle(context, item) {
      context.commit('ajaxStatusMut', item)
    },
    tokenHandle(context, item) {
      context.commit('tokenMut', item)
    },
    loadingHandle(context, item) {
      context.commit('loadingMut', item)
    },
    headerTabHandle(context, item) {
      context.commit('headerTabMut', item)
    }
  }
}
