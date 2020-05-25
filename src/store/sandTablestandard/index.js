/**
 * 备注：字段类型 定义初始
 *
 * */
const state = {
  report: false,
  //创建课程频道
  creatorClassList: [], //新增课程模板列表
  classType: 0, //课程类型
  indx: '', //课程下标
  succIframe: '', //第三方课程
  courseId: '', //创建的标准的id
  couType: '', //创建的类型
  refId: '', //创建的refid
  sceneThumbnailUrl: '', //缩略图
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
  editIndex: 0, //当前编辑模块的下标
  courseList: [{
    courseName: '',
    lessonList: [],
  }], //课程列表
  courseName: '', //课程名称
  uploadFileShow: false, //上传文件弹框显示隐藏
  PrimaryShow: false, //显示隐藏
  modifyDatetime: '', //更新时间
  bgImgStatus: 0, //0 未上传 1 已上传
  licationShow: true, // true显示 false隐藏
  checkedShow: true,
  maxH: 400,
  bgImg: "",
  courseInfo: {}, //实时保存的数据
  bgPicture: require('../../assets/creator/sandTablestandard/123123.jpg'),
  bgImgList: [{
    src: require('../../assets/creator/sandTable/icon-bg1.png'),
    type: 'default'
  }], //背景图片数据
  headIconList: [{
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
  ], //顶部header icon
}

const getters = {}

const mutations = {}

const actions = {}

const getFun = () => {
  let {
    keys,
    values,
    entries
  } = Object
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
