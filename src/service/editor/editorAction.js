import {
  editorResImaUpload,
  getEditResBackImg,
  editorResDefImg,
  delEditResBackImg,
  buildNewNpeCourse,
  changeNpeCouName,
  editAddNewPage,
  getAllPageInfoList,
  changeCouUpdPageContent,
  delCouConLogPage,
  copyEditFormPage,
  updateRadioPageMedia,
  fileupdateFileInfo,
  delPageMediaRadio,
  preNpeCouOperate,
  nextNpeCouOperate
} from './editorApi'
import {
  tipsFail,
  cloneObj,
  tipsMsg
} from '../../utils/utils'
import store from '../../store'
import router from '../../router'

const typeTrans = {
  title: {
    type: 'title',
    title: '图片',
    submit: 7,
    obj: {
      type: 'title',
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
  },
  text: {
    type: 'text', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题 image 图片
    title: '文本',
    submit: 1, //
    obj: {
      type: 'text', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
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
    }
  },
  imageText: {
    type: 'imageText', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
    title: '图文',
    submit: 2,
    obj: {
      type: 'imageText', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      leftSket: {}, //左侧画板内容
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
    }
  },
  video: {
    type: 'video', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
    title: '视频',
    submit: 3,
    obj: {
      type: 'video', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      leftSket: {
        uploadStatus: '', //文件上传状态
        name: '', //视频名称
        time: '', //视频时长
        size: '' //视频大小
      }, //左侧画板内容
      rightNav: {} //右侧功能栏内容
    }
  },
  file: {
    type: 'file', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
    title: '文档',
    submit: 4,
    obj: {
      type: 'file', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      leftSket: {
        uploadStatus: '', //文件上传状态
        name: '', //文档名称
        size: '' //文件大小
      }, //左侧画板内容
      rightNav: {} //右侧功能栏内容
    }
  },
  choiceQuestion: {
    type: 'choiceQuestion', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
    title: '选择题',
    submit: 5,
    obj: {
      type: 'choiceQuestion', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      leftSket: {
        title: '', //选择题问题
        answer: [{
            answer: '', //选项内容
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
    }
  },
  image: {
    type: 'image', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题 image 图片
    title: '文本',
    submit: 6,
    obj: {
      type: 'text', //文本类型 title 标题  text 文本  imageText 图文  video 视频  file 文档  choiceQuestion 选择题
      leftSket: {}, //左侧画板内容
      rightNav: {
        bgImg: '', //背景图片
        rightType: '背景' // 文字  背景
      } //右侧功能栏内容
    }
  }
}
const typeTransNum = {
  1: 'text',
  2: 'imageText',
  3: 'video',
  4: 'file',
  5: 'choiceQuestion',
  6: 'image',
  7: 'title'
}

//获取背景图片
export const getImgList = data => {
  getEditResBackImg(data).then(res => {
    if (res.code == 0) {
      let list = res.list || []
      list.map(d => {
        d.src = d.webUrl
        d.type = 'default'
        if (d.sysDefaultFlag === 0) {
          // 0 用户上传  1 系统默认
          d.type = 'new'
        }
      })
      store.dispatch('edit/bgImgListHandle', {
        bgImgList: list
      })
    } else {
      tipsFail(res.msg)
    }
  })
}

//上传背景图片
export const uploadBgImg = (data, callback) => {
  editorResImaUpload(data).then(res => {
    if (res.code == 0) {
      getImgList();
      let editList = cloneObj(store.state.edit.editList)
      let editIndex = store.state.edit.editIndex
      editList[editIndex].rightNav.bgImg = {
        src: res.data.webUrl,
        type: 'new',
        id: res.data.attachId
      };

      editList[editIndex].backgroundImageServerUrl = res.data.webUrl;
      editList[editIndex].rightNav.bgColor = null;
      editList[editIndex].backgroundColor = null;
      store.dispatch('edit/editListHandle', {
        editList: editList
      });

      //调用接口提交数据
      changeCouUpdPageContentFun({
        pageList: editList
      })
    } else {
      tipsFail(res.msg)
    }
  })
}

//获取配图接口
export const getEditorResDefImg = () => {
  editorResDefImg().then(res => {
    if (res.code == 0) {
      let list = res.list || []
      list.map(d => {
        d.src = d.webUrl
        d.type = 'default'
      })

      store.dispatch('edit/layOutListHandle', {
        layOutList: list
      })
    } else {
      tipsFail(res.msg)
    }
  })
}

//删除背景图接口
export const delEditResBackImgFun = data => {
  delEditResBackImg(data).then(res => {
    if (res.code == 0) {
      getImgList() //获取新的背景图数据组
      /*let editList=cloneObj(store.state.edit.editList);
      let editIndex=store.state.edit.editIndex;
      if(editList[editIndex].rightNav.bgImg.id=data.attachId){
        editList[editIndex].rightNav.bgImg={};
        editList[editIndex].rightNav.bgColor=null;
      }
      store.dispatch('edit/editListHandle', {
        editList: editList
      })*/
    } else {
      tipsFail(res.msg)
    }
  })
}

//新建npe课程
export const buildNewNpeCourseFun = () => {
  buildNewNpeCourse().then(res => {
    if (res.code == 0) {
      router.replace({
        path: router.path,
        query: {
          courseId: res.data.courseId
        }
      })
      getAllPageInfoListFun({
        courseId: res.data.courseId
      })
    } else {
      tipsFail(res.msg)
    }
  })
}

//修改课程名称
export const changeNpeCouNameFun = data => {
  changeNpeCouName(data).then(res => {
    if (res.code == 0) {} else {
      tipsFail(res.msg)
    }
  })
}

//编辑器新增画板接口
export const editAddNewPageFun = data => {
  editAddNewPage({
    courseId: data.courseId,
    pageType: typeTrans[data.obj.type].submit
  }).then(res => {
    if (res.code == 0) {
      let editIndex = store.state.edit.editIndex
      let editList = store.state.edit.editList
      let obj = cloneObj(editList[editIndex])
      obj = {
        ...obj,
        ...res.data.pageContent
      }
      editList[editIndex] = obj
      store.dispatch('edit/editListHandle', {
        editList: editList
      })
      getAllPageInfoListFun({
        courseId: data.courseId
      })
    } else {
      tipsFail(res.msg)
    }
  })
}

//编辑器所有画板信息查询接口
export const getAllPageInfoListFun = data => {
  getAllPageInfoList(data).then(res => {
    if (res.code == 0) {
      let newData = res.data.currentNpeCourseData;
      let list = newData.pageList;
      let editList = cloneObj(listMap(list));
      let editIndex = store.state.edit.editIndex;
      if (editIndex >= editList.length) {
        editIndex = editList.length - 1
      }
      store.dispatch('edit/editIndexHandle', {
        editIndex: editIndex
      });
      store.dispatch('edit/editListHandle', {
        editList: editList
      });
      store.dispatch('edit/courseInfoHandle', {
        courseInfo: {
          courseId: newData.courseId,
          courseName: newData.courseName,
          modifyDatetime: newData.modifyDatetime,
          previouseOperate: res.data.previousOperate || null, //上一步
          nextOperate: res.data.nextOperate || null, //下一步
        }
      });
    } else {
      tipsFail(res.msg)
    }
  })
}

//编辑器画板信息修改
export const changeCouUpdPageContentFun = (data, type = null) => {
  let headIconList = store.state.edit.headIconList
  headIconList[2].isUse = 'doing'
  store.dispatch('edit/headIconListHandle', {
    headIconList: headIconList
  })
  if (!data.courseId) {
    data.courseId = store.state.edit.courseInfo.courseId;
    data.courseName = store.state.edit.courseInfo.courseName;
  }
  changeCouUpdPageContent(data).then(res => {
    if (res.code == 0) {
      let newData = res.data.currentNpeCourseData;
      let list = newData.pageList
      let editList = cloneObj(listMap(list));
      let editIndex = store.state.edit.editIndex
      if (editIndex >= editList.length) {
        editIndex = editList.length - 1
      }
      store.dispatch('edit/editIndexHandle', {
        editIndex: editIndex
      });
      store.dispatch('edit/editListHandle', {
        editList: editList
      });
      store.dispatch('edit/courseInfoHandle', {
        courseInfo: {
          courseId: newData.courseId,
          courseName: newData.courseName,
          modifyDatetime: newData.modifyDatetime,
          previouseOperate: res.data.previousOperate || null, //上一步
          nextOperate: res.data.nextOperate || null, //下一步
        }
      });
      let headIconList = store.state.edit.headIconList
      headIconList[2].isUse = 'done'
      store.dispatch('edit/headIconListHandle', {
        headIconList: headIconList
      })
      store.dispatch('edit/modifyDatetimeHandle', {
        modifyDatetime: newData.modifyDatetime
      })
      if (type !== null) {
        getAllPageInfoListFun({
          courseId: data.courseId
        })
      }
    } else {
      tipsFail(res.msg)
    }
  })
}

//编辑器----删除画板接口
export const delCouConLogPageFun = data => {
  delCouConLogPage(data.data).then(res => {
    if (res.code == 0) {} else {
      tipsFail(res.msg)
    }
  })
}

//编辑器----复制
export const copyEditFormPageFun = data => {
  copyEditFormPage(data).then(res => {
    if (res.code == 0) {
      if (res.code == 0) {
        let editIndex = store.state.edit.editIndex
        let editList = store.state.edit.editList
        let obj = cloneObj(editList[editIndex])
        obj = {
          ...obj,
          ...res.data.pageContent
        }
        editList[editIndex] = obj
        store.dispatch('edit/editListHandle', {
          editList: editList
        })
        getAllPageInfoListFun({
          courseId: res.data.courseId
        })
      } else {
        tipsFail(res.msg)
      }
    } else {
      tipsFail(res.msg)
    }
  })
}

//编辑器画板视频信息查询接口
export const getAllPageInfovideoFun = data => {
  fileupdateFileInfo(data).then(res => {
    if (res.code == 0) {
      // getAllPageInfoListFun({
      //   couseId: data.courseId
      // });
    } else {
      tipsFail(res.msg)
    }
  })
}

//编辑器----上传音频文件
export const updateRadioPageMediaFun = (data,callback) => {
  updateRadioPageMedia(data).then(res => {
    if (res.code == 0) {
      let editIndex = store.state.edit.editIndex
      let editList = store.state.edit.editList
      let obj = cloneObj(editList[editIndex])
      obj.rightNav.radioServerUrl = res.data.webUrl
      obj.rightNav.radioAttachId = res.data.attachId
      obj.radioServerUrl = res.data.webUrl
      obj.radioAttachId = res.data.attachId
      obj.rightNav.recordStatus = 'end' // normal 开始展示 start开始录音  stop暂停  end录音结束
      editList[editIndex] = obj
      store.dispatch('edit/editListHandle', {
        editList: editList
      });
      if(typeof callback === 'function'){
        callback(res.data.webUrl);
      }
      changeCouUpdPageContentFun({
        pageList: editList
      })
    } else {
      tipsFail(res.msg)
    }
  })
}

//删除录音
export const delPageMediaRadioFun = data => {
  delPageMediaRadio(data).then(res => {
    if (res.code == 0) {
      let editIndex = store.state.edit.editIndex
      let editList = store.state.edit.editList
      let obj = cloneObj(editList[editIndex])
      obj.rightNav.radioServerUrl = ''
      obj.rightNav.radioAttachId = ''
      obj.radioServerUrl = ''
      obj.radioAttachId = ''
      obj.rightNav.recordStatus = 'normal' // normal 开始展示 start开始录音  stop暂停  end录音结束
      editList[editIndex] = obj
      store.dispatch('edit/editListHandle', {
        editList: editList
      });
      changeCouUpdPageContentFun({
        pageList: editList
      });
    } else {
      tipsFail(res.msg)
    }
  })
}

export const listMap = (list = []) => {
  let editList = []
  list.map(d => {
    let type = typeTransNum[d.pageType]
    let obj = {}
    obj = cloneObj(typeTrans[type].obj)
    obj = {
      ...obj,
      ...d,
      type: typeTrans[type].type
    }
    switch (type) {
      case 'title':
        (obj.look = false), //new
        (obj.leftSket.title = d.text || ''),
        (obj.rightNav = {
          fontColor: d.textFontColor || null, //文字颜色
          bgColor: d.backgroundColor || null, //背景颜色
          bgImg: d.backgroundImageServerUrl ? {
            src: d.backgroundImageServerUrl,
            type: 'default'
          } : '', //背景图片
          rightType: '背景' // 文字  背景
        })
        break
      case 'text':
        ;
        (obj.look = false), //new
        (obj.leftSket.title = d.text || '')
        obj.rightNav = {
          fontColor: d.textFontColor || null, //文字颜色
          bgColor: d.backgroundColor || null, //背景颜色
          bgImg: d.backgroundImageServerUrl ? {
            src: d.backgroundImageServerUrl,
            type: 'default'
          } : '', //背景图片
          selPositionVal: {
            type: d.position
          } || '', //位置
          rightType: '背景', // 文字  背景
          radioServerUrl: d.radioServerUrl || '',
          recordStatus: d.radioServerUrl ? 'end' : 'normal' // normal 开始展示 start开始录音  stop暂停  end录音结束
        }
        break
      case 'imageText':
        ;
        (obj.look = false), //new
        (obj.leftSket = {
          title: d.text || null,
          uploadImg: '画板状态',
          loadingStatus: d.imageServerUrl ? 3 : 1,
          courseServerUrl: d.imageServerUrl || ''
        })
        obj.rightNav = {
          fontColor: d.textFontColor || null, //文字颜色
          bgColor: d.backgroundColor || null, //背景颜色
          bgImg: d.backgroundImageServerUrl ? {
            src: d.backgroundImageServerUrl,
            type: 'default'
          } : '', //背景图片
          uploadImg: d.imageServerUrl || undefined, //配图
          rightType: '背景', // 文字  背景
          selAlignVal: d.alignType || '', //对其方式
          selPositionVal: '', //位置
          layOutVal: '' //配图选中项
        } //右侧功能栏内容;
        break
      case 'video':
        ;
        (obj.look = false), //new
        (obj.leftSket = {
          uploadStatus: d.videoServerUrl ? 'uploaded' : 'uploading', //文件上传状态
          loadingStatus: d.videoServerUrl ? 3 : 1,
          name: d.videoName || '', //视频名称
          time: d.videoDuration || '', //视频时长
          size: d.videoSize || '', //文件大小
          video: d.videoServerUrl || '' //视频大小
        }) //左侧画板内容
        break
      case 'file':
        ;
        (obj.look = false), //new
        (obj.leftSket = {
          uploadStatus: d.fileServerUrl ? 3 : 1, //文件上传状态
          fileServerUrl: d.fileServerUrl || '', //文件地址
          name: d.fileAttachName || '', //文档名称
          size: d.fileAttachSize || '' //文件大小
        })
        break
      case 'choiceQuestion':
        let answer = [],
          courseQuizChoicesList = d.courseQuizQuestion ?
          d.courseQuizQuestion.courseQuizChoicesList || [] : [];
        courseQuizChoicesList.map(m => {
          answer.push({
            ...m,
            answer: m.choice || '', //选项内容
            select: m.correctFlag || false //当前项是否是正确答案
          })
        });
        (obj.look = false), //new
        (obj.leftSket = {
          title: d.courseQuizQuestion ?
            d.courseQuizQuestion.question || '' : '', //选择题问题
          answer: answer //选择题答案
        }) //左侧画板内容
        obj.rightNav = {
          bgColor: d.backgroundColor || null, //背景颜色
          bgImg: d.backgroundImageServerUrl ? {
            src: d.backgroundImageServerUrl,
            type: 'default'
          } : '' //背景图片
        } //右侧功能栏内容
        break
      case 'image':
        ;
        (obj.look = false), //new
        (obj.leftSket = {
          title: d.text || null,
          uploadImg: '画板状态',
          loadingStatus: d.imageServerUrl ? 3 : 1,
          uploadStatus: d.imageServerUrl ? 'uploaded' : 'uploading', //文件上传状态
          courseServerUrl: d.imageServerUrl || ''
        })
        obj.rightNav = {
          bgImg: d.backgroundImageServerUrl ? {
            src: d.backgroundImageServerUrl,
            type: 'default',
          } : '' ,//背景图片
          radioServerUrl: d.radioServerUrl || '',
          recordStatus: d.radioServerUrl ? 'end' : 'normal' // normal 开始展示 start开始录音  stop暂停  end录音结束
        }
        break
      default:
        break
    }
    editList.push(obj)
  });
  return editList;
};

//上一步提交接口
export const preNpeCouOperateFun = () => {
  let courseInfo = store.state.edit.courseInfo;
  let previouseOperate = courseInfo.previouseOperate;
  if (!previouseOperate) {
    return;
  }
  preNpeCouOperate({
    operateId: previouseOperate.id,
    courseId: courseInfo.courseId
  }).then(res => {
    if (res.code == 0) {
      let newData = res.data.currentNpeCourseData;
      let list = newData.pageList;
      let editList = cloneObj(listMap(list));
      let editIndex = store.state.edit.editIndex;
      if (editIndex >= editList.length) {
        editIndex = editList.length - 1
      }
      store.dispatch('edit/editIndexHandle', {
        editIndex: editIndex
      });
      store.dispatch('edit/editListHandle', {
        editList: editList
      });
      store.dispatch('edit/courseInfoHandle', {
        courseInfo: {
          courseId: newData.courseId,
          courseName: newData.courseName,
          modifyDatetime: newData.modifyDatetime,
          previouseOperate: res.data.previousOperate || null, //上一步
          nextOperate: res.data.nextOperate || null, //下一步
        }
      });
    } else {
      tipsFail(res.msg);
    }
  })
};

//上一步提交接口
export const nextNpeCouOperateFun = () => {
  let courseInfo = store.state.edit.courseInfo;
  let nextOperate = courseInfo.nextOperate;
  if (!nextOperate) {
    return;
  }
  nextNpeCouOperate({
    operateId: nextOperate.id,
    courseId: courseInfo.courseId
  }).then(res => {
    if (res.code == 0) {
      let newData = res.data.currentNpeCourseData;
      let list = newData.pageList;
      let editList = cloneObj(listMap(list));
      let editIndex = store.state.edit.editIndex;
      if (editIndex >= editList.length) {
        editIndex = editList.length - 1
      }
      store.dispatch('edit/editIndexHandle', {
        editIndex: editIndex
      });
      store.dispatch('edit/editListHandle', {
        editList: editList
      });
      store.dispatch('edit/courseInfoHandle', {
        courseInfo: {
          courseId: newData.courseId,
          courseName: newData.courseName,
          modifyDatetime: newData.modifyDatetime,
          previouseOperate: res.data.previousOperate || null, //上一步
          nextOperate: res.data.nextOperate || null, //下一步
        }
      });
    } else {
      tipsFail(res.msg);
    }
  })
};
