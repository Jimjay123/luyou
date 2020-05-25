/**
 * 备注：字段类型 定义初始
 *
 * */
const state = {
  planLearningStateId: '',
  positionVal: '', //文本框位置
  alignVal: '', //对齐方式
  textMsg: '', //输入文本
  editIndex: 0, //当前编辑模块的下标
  modifyDatetime: '', //更新时间
  startTime: 0, //npe预览页开始时间
  endTime: 0, //npe预览页结束时间
  lastIndex: -1, //获取上一次点击index
  courseName: '', //课程名称
  courseStateId: -1, //课程学习id
  planStateId: -1, //计划学习id
  courseLearningStateId: 0, //学生端去学习id
  isActiveChoice: -1, //选择题画板选中对错状态
  isActiveIndex: -1, //选择题选中画板的下标
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
  bgImgList: [{
      src: require('../../assets/creator/default.png'),
      type: 'default'
    },
    {
      src: require('../../assets/creator/default.png'),
      type: 'new'
    }
  ], //背景图片数据
  layOutList: [{
    src: require('../../assets/creator/default.png'),
    type: 'default'
  }], //配图数据
  enlargeScale: 100, //画板放大比例
  courseInfo: {}, //当前课程基本信息
  editList: [{
      type: 'title', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
      look: false,
      leftSket: {
        title: '这是画板标题'
      }, //左侧画板内容
      rightNav: {
        fontColor: null, //文字颜色
        bgColor: null, //背景颜色
        bgImg: {
          src: '',
          type: 'default'
        }, //背景图片
        rightType: '背景' // 文字  背景
      } //右侧功能栏内容
    }
    /*{
      type: 'text', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
      look: false,
      leftSket: {
        title: '点击输入文本'
      }, //左侧画板内容
      rightNav: {
        fontColor: null, //文字颜色
        bgColor: null, //背景颜色
        bgImg: '', //背景图片
        rightType: '背景', // 文字  背景
        selAlignVal: '', //对其方式
        selPositionVal: '' //位置
      } //右侧功能栏内容
    },
    {
      type: 'imageText', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
      look: false,
      leftSket: {
        title: 'text',
        uploadImg: '画板状态',
        loadingStatus: 1,
        courseServerUrl: ''
      }, //左侧画板内容
      rightNav: {
        fontColor: null, //文字颜色
        bgColor: null, //背景颜色
        bgImg: '', //背景图片
        uploadImg: '', //上传文件背景图片
        rightType: '背景', // 文字  背景
        selAlignVal: '', //对其方式
        selPositionVal: '', //位置
        layOutVal: '' //配图选中项
      } //右侧功能栏内容
    },
    {
      type: 'video', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
      look: false,
      leftSket: {
        uploadStatus: 1, //文件上传状态
        loadingStatus: 1,
        name: '', //视频名称
        time: '', //视频时长
        size: '' //视频大小
      }, //左侧画板内容
      rightNav: {} //右侧功能栏内容
    },
    {
      type: 'file', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
      look: false,
      leftSket: {
        uploadStatus: 1, //文件上传状态
        name: '', //文档名称
        size: '', //文件大小
        fileServerUrl: '', //文件地址
        fileAttachId: '' //文件id
      }, //左侧画板内容
      rightNav: {} //右侧功能栏内容
    },
    {
      type: 'choiceQuestion', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
      look: false,
      leftSket: {
        title: '', //选择题问题
        answer: [
          {
            answer: '123\n12312', //选项内容
            select: true //当前项是否是正确答案
          },
          {
            answer: '', //选项内容
            select: false //当前项是否是正确答案
          }
        ] //选择题答案
      }, //左侧画板内容
      rightNav: {
        bgColor: null, //背景颜色
        bgImg: '' //背景图片
      } //右侧功能栏内容
    },
    {
      type: 'image', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
      look: false,
      leftSket: {
        uploadImg: '画板状态',
        loadingStatus: 1,
        courseServerUrl: '',
        uploadStatus: ''
      }, //左侧画板内容
      rightNav: {
        bgColor: null, //背景颜色
        bgImg: '' //背景图片
      } //右侧功能栏内容
    }*/
  ],
  previewEditList: [{
      type: 'title', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
      look: false,
      leftSket: {
        title: '这是画板标题'
      }, //左侧画板内容
      rightNav: {
        fontColor: null, //文字颜色
        bgColor: null, //背景颜色
        bgImg: {
          src: require('../../assets/creator/default.png'),
          type: 'default'
        }, //背景图片
        rightType: '背景' // 文字  背景
      } //右侧功能栏内容
    }
    // {
    //   type: 'text', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
    //   look: false,
    //   leftSket: {
    //     title: '点击输入文本'
    //   }, //左侧画板内容
    //   rightNav: {
    //     fontColor: null, //文字颜色
    //     bgColor: null, //背景颜色
    //     bgImg: '', //背景图片
    //     rightType: '背景', // 文字  背景
    //     selAlignVal: '', //对其方式
    //     selPositionVal: '' //位置
    //   } //右侧功能栏内容
    // },
    // {
    //   type: 'imageText', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
    //   look: false,
    //   leftSket: {
    //     title: 'text',
    //     uploadImg: '画板状态',
    //     loadingStatus: 1,
    //     courseServerUrl: ''
    //   }, //左侧画板内容
    //   rightNav: {
    //     fontColor: null, //文字颜色
    //     bgColor: null, //背景颜色
    //     bgImg: '', //背景图片
    //     uploadImg: '', //上传文件背景图片
    //     rightType: '背景', // 文字  背景
    //     selAlignVal: '', //对其方式
    //     selPositionVal: '', //位置
    //     layOutVal: '' //配图选中项
    //   } //右侧功能栏内容
    // },
    // {
    //   type: 'video', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
    //   look: false,
    //   leftSket: {
    //     uploadStatus: 1, //文件上传状态
    //     loadingStatus: 1,
    //     name: '', //视频名称
    //     time: '', //视频时长
    //     size: '' //视频大小
    //   }, //左侧画板内容
    //   rightNav: {} //右侧功能栏内容
    // },
    // {
    //   type: 'file', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
    //   look: false,
    //   leftSket: {
    //     uploadStatus: 1, //文件上传状态
    //     name: '', //文档名称
    //     size: '', //文件大小
    //     fileServerUrl: '', //文件地址
    //     fileAttachId: '' //文件id
    //   }, //左侧画板内容
    //   rightNav: {} //右侧功能栏内容
    // },
    // {
    //   type: 'choiceQuestion', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
    //   look: false,
    //   leftSket: {
    //     title: '', //选择题问题
    //     answer: [
    //       {
    //         answer: '123\n12312', //选项内容
    //         select: true //当前项是否是正确答案
    //       },
    //       {
    //         answer: '', //选项内容
    //         select: false //当前项是否是正确答案
    //       }
    //     ] //选择题答案
    //   }, //左侧画板内容
    //   rightNav: {
    //     bgColor: null, //背景颜色
    //     bgImg: '' //背景图片
    //   } //右侧功能栏内容
    // },
    // {
    //   type: 'image', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题  image 图片
    //   look: false,
    //   leftSket: {
    //     uploadImg: '画板状态',
    //     loadingStatus: 1,
    //     courseServerUrl: ''
    //   }, //左侧画板内容
    //   rightNav: {
    //     bgColor: null, //背景颜色
    //     bgImg: '' //背景图片
    //   } //右侧功能栏内容
    // }
  ]
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
