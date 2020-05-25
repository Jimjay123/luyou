import { tools } from '@/utils/tools.js'
import url from '../url'
import axios from 'axios'

//编辑器--上传背景图片
export const editorResImaUpload = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['editorResImaUpload'],
    'Content-Type': 'multipart/form-data',
    data
  }
  return tools.ajax(cfg)
}

//编辑器获取背景图片
export const getEditResBackImg = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['getEditResBackImg'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器获取配图接口
export const editorResDefImg = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['editorResDefImg'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器获取配图接口
export const delEditResBackImg = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['delEditResBackImg'],
    data
  }
  return tools.ajax(cfg)
}

//新建npe课程
export const buildNewNpeCourse = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['buildNewNpeCourse'],
    data
  }
  return tools.ajax(cfg)
}

//npe课程名称修改
export const changeNpeCouName = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['changeNpeCouName'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器新增画板
export const editAddNewPage = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['editAddNewPage'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器所有画板信息查询接口
export const getAllPageInfoList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['getAllPageInfoList'],
    data
  }
  return tools.ajax(cfg)
}

// 编辑器 文档上传接口
export const attachUpload = (data, onUploadProgress, cancelToken) => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['attachUpload'],
    //headers: { "Content-Type": "multipart/form-data" },
    'Content-Type': 'multipart/form-data',
    onUploadProgress: progressEvent => {
      onUploadProgress(progressEvent)
    },
    cancelToken: new axios.CancelToken(cancel => {
      cancelToken(cancel)
    }),
    data,
    timeout: 0
  }
  return tools.ajax(cfg)
}

//编辑器所有画板信息查询接口
export const changeCouUpdPageContent = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['changeCouUpdPageContent'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器画板视频信息查询接口
export const fileupdateFileInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['fileupdateFileInfo'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器所有画板信息查询接口
export const logicDeleteAttach = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['logicDeleteAttach'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器----删除画板
export const delCouConLogPage = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['delCouConLogPage'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器----复制画板
export const copyEditFormPage = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['copyEditFormPage'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器----上传音频文件
export const updateRadioPageMedia = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    'Content-Type': 'multipart/form-data',
    url: url['updateRadioPageMedia'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器----上传音频文件
export const delPageMediaRadio = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['delPageMediaRadio'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器----上一步提交接口
export const preNpeCouOperate = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['preNpeCouOperate'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器----下一步提交接口
export const nextNpeCouOperate = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['nextNpeCouOperate'],
    data
  }
  return tools.ajax(cfg)
}

//编辑器----下一步提交接口
export const confirmNpeCourseData = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['confirmNpeCourseData'],
    data
  }
  return tools.ajax(cfg)
}

// previewNpeCourseData
//npe预览页----创作者端-预览接口
export const previewNpeCourseData = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['previewNpeCourseData'],
    data
  }
  return tools.ajax(cfg)
}

//npe预览页---老师端/学生端-预览接口
export const npeCourseData = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['npeCourseData'],
    data
  }
  return tools.ajax(cfg)
}

//npe预览页---学生端-学习接口
export const npeCourseLearningState = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['npeCourseLearningState'],
    data
  }
  return tools.ajax(cfg)
}
