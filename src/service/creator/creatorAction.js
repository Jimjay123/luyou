import {
  saveCourseChannel,
  updateCourseChannel
} from '../teachersApi'
import {
  systemNoticeTotal
} from '../creatorApi'
import {
  tipsFail,
  cloneObj,
  trimNumber
} from '../../utils/utils'
import store from '../../store'
import router from '../../router'

export const saveCreatorFun = options => {
  // 提交数据处理 处理courseList 标准课
  let getMapFun = data => {
    let newData = cloneObj(data)
    let list = []
    newData.map(item => {
      list.push({
        courseId: item.courseId,
        courseName: item.title
      })
    })
    return cloneObj(list)
  }

  //处理提交数据转化 处理bundleList 章节
  let subMapFun = data => {
    let newData = cloneObj(data)
    let list = []
    newData.map(item => {
      list.push({
        bundleName: item.bundleName,
        bundleId: item.bundleId,
        delFlag: item.delFlag || false,
        courseList: getMapFun(item.courseList)
      })
    })
    return cloneObj(list)
  }

  //设置courseList数据
  let setCouListFun = (data, d = []) => {
    let newData = cloneObj(data)
    let list = []
    newData.map(item => {
      let c = d.find(o => o.courseBundleRelId === item.courseBundleRelId) || {}
      list.push({
        ...item,
        isEdit: c.isEdit || false, //是否编辑中
        delFlag: c.delFlag || false, //是否删除
        isOpen: c.isOpen || false //是否展开
      })
    })
    return cloneObj(list)
  }

  //处理后台获取的bulidList 数据
  let setBuildListFun = data => {
    let newData = cloneObj(data)
    let list = []
    newData.map((item, index) => {
      let d = creatorClassList.find(o => o.bundleId === item.bundleId) || {}
      let obj = {
        ...item,
        isEdit: d.isEdit || false, //是否编辑中
        delFlag: d.delFlag || false //是否删除
      }
      obj.courseList = setCouListFun(item.courseList, d.courseList)
      list.push(obj)
    })
    return cloneObj(list)
  }

  //vuex bulidList 数据
  let creatorClassList = cloneObj(store.state.creator.creatorClassList)
  let item = options.item

  if (creatorClassList.length <= 0) {
    //第一次为新增
    creatorClassList = [{
      bundleId: '',
      bundleName: '第' + trimNumber(1) + '章',
      delFlag: false,
      isEdit: false, //是否编辑中 true 是 false 不是
      courseList: setCouListFun([item])
    }]

    let data = {
      channelName: options.planName || '',
      bundleList: subMapFun(creatorClassList)
    }
    saveCourseChannel(data).then(res => {
      console.log(res)
      if (res.code == 0) {
        let bundleList = res.data.bundleList
        bundleList[0].isEdit = creatorClassList[0].isEdit
        let item = creatorClassList[0].courseList[0]
        bundleList[0].courseList[0] = {
          ...bundleList[0].courseList[0],
          isEdit: item.isEdit, //是否编辑中
          isOpen: item.isOpen //是否展开
        }
        router.replace({
          path: router.path,
          query: {
            temIndex: 0,
            addCourseType: 'add',
            courseChannelId: res.data.channelId
          }
        })
        store.dispatch('creator/creatorClassListHandle', {
          creatorClassList: bundleList
        })

        let creList = cloneObj(store.state.creator.creList)
        creList[options.i].courseEditType = 'add'
        store.dispatch('creator/creListHandle', {
          creList: creList
        })
        // updateTime
        let time = res.data.modifyDatetime.slice(11, 16)
        console.log(time)
        store.dispatch('creator/creatorModifyDateTimeHandle', {
          creatorModifyDateTime: {
            modifyDatetime: time
          }
        })
        //channelId
        store.dispatch('creator/creatorChannelHandle', {
          creatorChannel: {
            channelId: res.data.channelId
          }
        })
      } else {
        tipsFail(res.msg)
      }
    })
  } else {
    //除第一次 其余为保存 接口
    /*
     * 一、添加
     *   1、添加新的课程频道
     *   2、添加新的竖版
     *   3、添加竖版下新的课程
     * 二、删除
     *   1、删除竖版唯一一个课 --即删除竖版
     *   2、删除竖版中 一节课
     *
     * */
    let {
      type,
      item,
      i,
      id,
      temIndex,
      edit,
      editType,
      delType
    } = options
    let creList = cloneObj(store.state.creator.creList);
    let delBuild = '';
    if (type == 1) {
      //添加
      creList[options.i].courseEditType = 'add'
      //1、添加新的课程频道
      //2、添加新的竖版
      if (temIndex === null) {
        creatorClassList.push({
          bundleId: '',
          bundleName: '第' + trimNumber(creatorClassList.length + 1) + '章',
          delFlag: false,
          isEdit: false, //是否编辑中 true 是 false 不是
          courseList: setCouListFun([item])
        })
      } else {
        //3、添加竖版下新的课程
        creatorClassList[temIndex].courseList.push({
          ...item,
          isEdit: false, //是否编辑中
          delFlag: false, //是否删除
          isOpen: false //是否展开
        })
      }
    } else if (type == 2) {
      //删除
      if (delType !== 'creDel') {
        if (!edit) {
          //2、删除竖版唯一一个课 --即删除竖版
          if (
            creatorClassList[temIndex].courseList.length === 1 ||
            i === null
          ) {
            creatorClassList[temIndex].delFlag = true // true 删除 false 新增
            let index = creList.findIndex(
              d =>
              d.courseId === creatorClassList[temIndex].courseList[0].courseId
            )
            creList[index].courseEditType = false
          } else {
            //2、删除竖版中 一节课
            creList[i].courseEditType = false
            let index = creatorClassList[temIndex].courseList.findIndex(
              d => d.courseId === creList[i].courseId
            )
            creatorClassList[temIndex].courseList[index].delFlag = true
          }
        }
      } else {
        //delType:'creDel',// creDel 表示竖版内点击删除
        //2、删除竖版唯一一个课 --即删除竖版
        if (creatorClassList[temIndex].courseList.length === 1 || i === null) {
          creatorClassList[temIndex].delFlag = true; // true 删除 false 新增
          delBuild = creatorClassList[temIndex];
        } else {
          //2、删除竖版中 一节课
          creatorClassList[temIndex].courseList[i].delFlag = true
        }
      }
    } else {
      //type 1 添加  2 删除  3 修改
    }

    //处理提交数据转化 处理bundleList 章节
    let subMapFun = data => {
      let newData = cloneObj(data)
      let list = []
      newData.map(item => {
        let obj = cloneObj(item)
        obj.coursePlanBundleRelId = item.channelBundleRelId
        obj.delFlag = obj.delFlag || false
        list.push(obj)
      })
      return cloneObj(list)
    }

    let data = {
      channelName: options.planName || '',
      channelId: store.state.creator.creatorChannel.channelId,
      bundleList: subMapFun(creatorClassList)
    }
    updateCourseChannel(data).then(res => {
      console.log(res);
      if (res.code == 0) {
        if (editType === 'all') {
          //章节标题修改
          creatorClassList[temIndex].isEdit = false
        } else if (editType === 'one') {
          //章节下课程标题修改
          creatorClassList[temIndex].courseList[i].isEdit = false
        }
        let newList = setBuildListFun(res.data.bundleList)
        store.dispatch('creator/creatorClassListHandle', {
          creatorClassList: newList
        })

        if (delBuild) {
          //删除竖版内的最后一节标准课 缓存删除信息
          store.dispatch('creator/creatorDelCourseHandle', {
            creatorDelCourse: {
              index: temIndex, //下标
              type: 'tem',
              show: true,
              data: delBuild //被删除的数据
            }
          });
        }

        // updateTime
        let time = res.data.modifyDatetime.slice(11, 16)
        console.log(time)
        store.dispatch('creator/creatorModifyDateTimeHandle', {
          creatorModifyDateTime: {
            modifyDatetime: time
          }
        })

        if (temIndex === null) {
          router.replace({
            path: router.path,
            query: {
              temIndex: res.data.bundleList.length - 1,
              addCourseType: 'add',
              courseChannelId: res.data.channelId
            }
          })
        }

        if (temIndex !== null && !res.data.bundleList[temIndex]) {
          router.replace({
            path: router.path,
            query: {
              temIndex: null,
              addCourseType: 'add',
              courseChannelId: res.data.channelId
            }
          })
        }

        if (type != 3) {
          store.dispatch('creator/creListHandle', {
            creList: creList
          })
        }
      } else {
        tipsFail(res.msg)
      }
    })
  }
}

// 沙盘标准课
export const saveCreatorsFun = options => {
  // 提交数据处理 处理courseList 标准课
  let getMapFun = data => {
    let newData = cloneObj(data)
    let list = []
    newData.map(item => {
      list.push({
        courseId: item.courseId,
        courseName: item.title
      })
    })
    return cloneObj(list)
  }

  //处理提交数据转化 处理bundleList 章节
  let subMapFun = data => {
    let newData = cloneObj(data)
    let list = []
    newData.map(item => {
      list.push({
        bundleName: item.bundleName,
        bundleId: item.bundleId,
        delFlag: item.delFlag || false,
        courseList: getMapFun(item.courseList)
      })
    })
    return cloneObj(list)
  }

  //设置courseList数据
  let setCouListFun = (data, d = []) => {
    let newData = cloneObj(data)
    let list = []
    newData.map(item => {
      let c = d.find(o => o.courseBundleRelId === item.courseBundleRelId) || {}
      list.push({
        ...item,
        isEdit: c.isEdit || false, //是否编辑中
        delFlag: c.delFlag || false, //是否删除
        isOpen: c.isOpen || false //是否展开
      })
    })
    return cloneObj(list)
  }

  //处理后台获取的bulidList 数据
  let setBuildListFun = data => {
    let newData = cloneObj(data)
    let list = []
    newData.map((item, index) => {
      let d = creatorClassList.find(o => o.bundleId === item.bundleId) || {}
      let obj = {
        ...item,
        isEdit: d.isEdit || false, //是否编辑中
        delFlag: d.delFlag || false //是否删除
      }
      obj.courseList = setCouListFun(item.courseList, d.courseList)
      list.push(obj)
    })
    return cloneObj(list)
  }

  //vuex bulidList 数据
  let creatorClassList = cloneObj(store.state.sandTablestandard.creatorClassList)
  let item = options.item

  if (creatorClassList.length <= 0) {
    //第一次为新增
    creatorClassList = [{
      bundleId: '',
      bundleName: '第' + trimNumber(1) + '章',
      delFlag: false,
      isEdit: false, //是否编辑中 true 是 false 不是
      courseList: setCouListFun([item])
    }]

    let data = {
      channelName: options.planName || '',
      bundleList: subMapFun(creatorClassList)
    }
    saveCourseChannel(data).then(res => {
      console.log(res)
      if (res.code == 0) {
        let bundleList = res.data.bundleList
        bundleList[0].isEdit = creatorClassList[0].isEdit
        let item = creatorClassList[0].courseList[0]
        bundleList[0].courseList[0] = {
          ...bundleList[0].courseList[0],
          isEdit: item.isEdit, //是否编辑中
          isOpen: item.isOpen //是否展开
        }
        router.replace({
          path: router.path,
          query: {
            temIndex: 0,
            addCourseType: 'add',
            courseChannelId: res.data.channelId
          }
        })
        store.dispatch('sandTablestandard/creatorClassListHandle', {
          creatorClassList: bundleList
        })

        let creList = cloneObj(store.state.sandTablestandard.creList)
        creList[options.i].courseEditType = 'add'
        store.dispatch('sandTablestandard/creListHandle', {
          creList: creList
        })
        // updateTime
        let time = res.data.modifyDatetime.slice(11, 16)
        console.log(time)
        store.dispatch('sandTablestandard/creatorModifyDateTimeHandle', {
          creatorModifyDateTime: {
            modifyDatetime: time
          }
        })
        //channelId
        store.dispatch('sandTablestandard/creatorChannelHandle', {
          creatorChannel: {
            channelId: res.data.channelId
          }
        })
      } else {
        tipsFail(res.msg)
      }
    })
  } else {
    //除第一次 其余为保存 接口
    /*
     * 一、添加
     *   1、添加新的课程频道
     *   2、添加新的竖版
     *   3、添加竖版下新的课程
     * 二、删除
     *   1、删除竖版唯一一个课 --即删除竖版
     *   2、删除竖版中 一节课
     *
     * */
    let {
      type,
      item,
      i,
      id,
      temIndex,
      edit,
      editType,
      delType
    } = options
    let creList = cloneObj(store.state.sandTablestandard.creList);
    let delBuild = '';
    if (type == 1) {
      //添加
      creList[options.i].courseEditType = 'add'
      //1、添加新的课程频道
      //2、添加新的竖版
      if (temIndex === null) {
        creatorClassList.push({
          bundleId: '',
          bundleName: '第' + trimNumber(creatorClassList.length + 1) + '章',
          delFlag: false,
          isEdit: false, //是否编辑中 true 是 false 不是
          courseList: setCouListFun([item])
        })
      } else {
        //3、添加竖版下新的课程
        creatorClassList[temIndex].courseList.push({
          ...item,
          isEdit: false, //是否编辑中
          delFlag: false, //是否删除
          isOpen: false //是否展开
        })
      }
    } else if (type == 2) {
      //删除
      if (delType !== 'creDel') {
        if (!edit) {
          //2、删除竖版唯一一个课 --即删除竖版
          if (
            creatorClassList[temIndex].courseList.length === 1 ||
            i === null
          ) {
            creatorClassList[temIndex].delFlag = true // true 删除 false 新增
            let index = creList.findIndex(
              d =>
              d.courseId === creatorClassList[temIndex].courseList[0].courseId
            )
            creList[index].courseEditType = false
          } else {
            //2、删除竖版中 一节课
            creList[i].courseEditType = false
            let index = creatorClassList[temIndex].courseList.findIndex(
              d => d.courseId === creList[i].courseId
            )
            creatorClassList[temIndex].courseList[index].delFlag = true
          }
        }
      } else {
        //delType:'creDel',// creDel 表示竖版内点击删除
        //2、删除竖版唯一一个课 --即删除竖版
        if (creatorClassList[temIndex].courseList.length === 1 || i === null) {
          creatorClassList[temIndex].delFlag = true; // true 删除 false 新增
          delBuild = creatorClassList[temIndex];
        } else {
          //2、删除竖版中 一节课
          creatorClassList[temIndex].courseList[i].delFlag = true
        }
      }
    } else {
      //type 1 添加  2 删除  3 修改
    }

    //处理提交数据转化 处理bundleList 章节
    let subMapFun = data => {
      let newData = cloneObj(data)
      let list = []
      newData.map(item => {
        let obj = cloneObj(item)
        obj.coursePlanBundleRelId = item.channelBundleRelId
        obj.delFlag = obj.delFlag || false
        list.push(obj)
      })
      return cloneObj(list)
    }

    let data = {
      channelName: options.planName || '',
      channelId: store.state.sandTablestandard.creatorChannel.channelId,
      bundleList: subMapFun(creatorClassList)
    }
    updateCourseChannel(data).then(res => {
      console.log(res);
      if (res.code == 0) {
        if (editType === 'all') {
          //章节标题修改
          creatorClassList[temIndex].isEdit = false
        } else if (editType === 'one') {
          //章节下课程标题修改
          creatorClassList[temIndex].courseList[i].isEdit = false
        }
        let newList = setBuildListFun(res.data.bundleList)
        store.dispatch('sandTablestandard/creatorClassListHandle', {
          creatorClassList: newList
        })

        if (delBuild) {
          //删除竖版内的最后一节标准课 缓存删除信息
          store.dispatch('sandTablestandard/creatorDelCourseHandle', {
            creatorDelCourse: {
              index: temIndex, //下标
              type: 'tem',
              show: true,
              data: delBuild //被删除的数据
            }
          });
        }

        // updateTime
        let time = res.data.modifyDatetime.slice(11, 16)
        console.log(time)
        store.dispatch('sandTablestandard/creatorModifyDateTimeHandle', {
          creatorModifyDateTime: {
            modifyDatetime: time
          }
        })

        if (temIndex === null) {
          router.replace({
            path: router.path,
            query: {
              temIndex: res.data.bundleList.length - 1,
              addCourseType: 'add',
              courseChannelId: res.data.channelId
            }
          })
        }

        if (temIndex !== null && !res.data.bundleList[temIndex]) {
          router.replace({
            path: router.path,
            query: {
              temIndex: null,
              addCourseType: 'add',
              courseChannelId: res.data.channelId
            }
          })
        }

        if (type != 3) {
          store.dispatch('sandTablestandard/creListHandle', {
            creList: creList
          })
        }
      } else {
        tipsFail(res.msg)
      }
    })
  }
}

//获取用户系统消息数量接口
export const systemNoticeTotalFun = (callback = null) => {
  systemNoticeTotal({
    readFlag: '0'
  }).then(res => {
    if (res.code == 0) {
      let otherList = store.state.creator.otherList
      otherList[1].count = res.data
      store.dispatch('creator/otherListHandle', {
        otherList: otherList
      })
    } else {
      tipsFail(res.msg)
    }
  })
}
