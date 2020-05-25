import { tools } from '@/utils/tools.js'
import url from './url'

//创作者端沙盘基础信息设置--标准课--沙盘课程预览 创作者端
export const stCoursestCourseData = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['stCoursestCourseData'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--标准课--沙盘课程预览 创作者端
export const CoursepreviewStCourse = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['CoursepreviewStCourse'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--标准课--沙盘标准课发布
export const OperateconfirmData = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['OperateconfirmData'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--标准课--沙盘标准课重做
export const nextStCourseOperate = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['nextStCourseOperate'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--标准课--沙盘标准课撤销
export const previousStCourseOperate = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['previousStCourseOperate'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--标准课--获取课程列表
export const universityAvailCourseList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['universityAvailCourseList'],
    data
  }
  return tools.ajax(cfg)
}
//创作者端沙盘基础信息设置--标准课--创建沙盘
export const OperatenewStCourse = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['OperatenewStCourse'],
    data
  }
  return tools.ajax(cfg)
}
//创作者端沙盘基础信息设置--标准课--上传场景
export const stCourseSceneUpload = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['stCourseSceneUpload'],
    timeout:0,
    data
  }
  return tools.ajax(cfg)
}
//创作者端沙盘基础信息设置--标准课--沙盘标准课获取保存后的数据
export const OperateStCourseData = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['OperateStCourseData'],
    data
  }
  return tools.ajax(cfg)
}
//创作者端沙盘基础信息设置--标准课--上传后保存数据
export const OperateNewOperate = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['OperateNewOperate'],
    data
  }
  return tools.ajax(cfg)
}
//创作者端沙盘基础信息设置--标准课--沙盘标准课内容数据
export const OperatenewbindStandard = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['OperatenewbindStandard'],
    data
  }
  return tools.ajax(cfg)
}
//创作者端沙盘基础信息设置--课程频道--创建沙盘
export const newStChannel = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['newStChannel'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--课程频道--上传背景
export const stChannelSceneUpload = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['stChannelSceneUpload'],
    timeout:0,
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--课程频道--新增操作步骤
export const stChannelNewOperate = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['stChannelNewOperate'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--课程频道--下一步
export const nextStChannelOperate = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['nextStChannelOperate'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--课程频道--上一步
export const previousStChannelOperate = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['previousStChannelOperate'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--课程频道--刷新
export const getStChannelData = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['getStChannelData'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--课程频道--去发布
export const confirmStChannelData = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['confirmStChannelData'],
    data
  }
  return tools.ajax(cfg)
}

//创作者端沙盘基础信息设置--课程频道--预览页
export const previewStChannelData = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['previewStChannelData'],
    data
  }
  return tools.ajax(cfg)
}
