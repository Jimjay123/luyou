/**
 * 备注：字段类型 定义初始
 *
 * */
const state = {
  tabList: [], //选中课程
  creList: [], //添加课程竖版列表
  sandTable: {}, //添加课程
  oldSandTable:{},//对比添加课程
  modifyDatetime: '', //更新时间
  bgImgStatus: 0, //0 未上传 1 已上传
  showAddDailog: 0, // 添加课程弹框 0 不显示 1显示
  addOrChangeCourse: {
    num: 0, //0 add 1 change
    index: -1 // 新创建课程index
  }, //0 添加课程 1 替换课程

  // 预览数组
  previewList: {},
  bgImg: require('../../assets/creator/sandTable/icon-bg1.png'), //背景图片数据
  headIconList: [
    {
      src: require('../../assets/creator/editor/pre.svg'),
      disabledSrc: require('../../assets/creator/editor/pre-disabled.svg'),
      isUse: 'normal', //是否可用 normal可用  done 不可用
      tips: '撤销'
    },
    {
      src: require('../../assets/creator/editor/next.svg'),
      disabledSrc: require('../../assets/creator/editor/next-disabled.svg'),
      isUse: 'normal', //是否可用 normal可用  done 不可用
      tips: '重做'
    },
    {
      src: require('../../assets/creator/editor/save-normal.svg'),
      doingSrc: require('../../assets/creator/editor/save-doing.svg'),
      disabledSrc: require('../../assets/creator/editor/save-done.svg'),
      isUse: 'normal', //normal  doing  done
      tips: '保存'
    }
  ] //顶部header icon
}

const getters = {}

const mutations = {}

const actions = {}

const getFun = () => {
  let { keys, values, entries } = Object
  for (let [key, value] of entries(state)) {
    getters[key] = state => {
      return state[key]
    }

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
    }
    actions[key + 'Handle'] = (context, item) => {
      context.commit(key + 'Mut', item)
    }
  }
}
getFun()
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
