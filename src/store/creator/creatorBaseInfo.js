const state = {
  channelKeyId: '',
  channelKeyType: '',
  channelKeyName: '',
  channelExpressId: '',
  text: {
    title: '',
    content: '',
    cancel: '',
    confirm: ''
  },
  channelShow: '',
  file: {}, //上传文件缓存信息
  teaInfo: '', //讲师简介
  title: '', //课程标题
  titleTips: {
    show: false,
    content: '课程标题不能为空'
  }, //课程标题必填提示框
  majorList: [], //专业学科可选项列表
  major: {
    id: '',
    name: ''
  }, //专业学科选中项
  majorTips: {
    show: false,
    content: '请选择专业学科'
  }, //课程标题必填提示框
  tagList: [], //标签可选列表
  tag: '', //标签选中项
  duration: '', //建议时长
  durationTips: {
    show: false,
    content: '建议时长不能为空'
  }, //建议时长
  selfIntro: '', //课程简介
  selfIntroTips: {
    show: false,
    content: '课程简介不能为空'
  }, //课程简介提示信息
  learnReceives: [], //学到什么
  learnRequires: [], //需要什么
  welcome: '', //欢迎消息
  datum: '', //基准分设置
  congratulation: '', //祝贺消息
};

const getters = {};

const mutations = {};

const actions = {};

const getFun = () => {
  let {
    keys,
    values,
    entries
  } = Object;
  for (let [key, value] of entries(state)) {
    getters[key] = (state) => {
      return state[key]
    };

    mutations[key + 'Mut'] = (state, item) => {
      if (typeof state[key] === 'object') {
        if (Array.isArray(state[key])) {
          state[key] = [...item[key]]
        } else {
          state[key] = {
            ...item[key]
          }
        }
      } else {
        state[key] = item[key]
      }
    };
    actions[key + 'Handle'] = (context, item) => {
      context.commit(key + 'Mut', item)
    }
  }
};
getFun();
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
