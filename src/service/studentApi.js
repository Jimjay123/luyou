import { tools } from '@/utils/tools'
import url from './url'

//获取学生加入的群列表
export const stuGroJoinGroList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['stuGroJoinGroList'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--搜索群
export const stuGroSeaGroup = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['stuGroSeaGroup'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--加群接口
export const stuGroJoinGroup = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['stuGroJoinGroup'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--群课程计划列表
export const stuGroPlaLeaStaList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['stuGroPlaLeaStaList'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--获取学生课程计划数量
export const stuGroPlaTotStatistic = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['stuGroPlaTotStatistic'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--获取邀请成员链接
export const groInfoInvUrl = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groInfoInvUrl'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--获取邀请成员链接
export const memIdeStuIdentity = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['memIdeStuIdentity'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--退出群组接口
export const groMemQuiGroup = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['groMemQuiGroup'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--沙盘课程频道接口-学生端去预览
export const stChannelData = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['stChannelData'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--沙盘课程频道接口-学生端去学习
export const sandTablePlanLearningState = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['sandTablePlanLearningState'],
    data
  }
  return tools.ajax(cfg)
}

// stCourseBaseInfo
//学生端--标准课报告详情页
export const stCourseBaseInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['stCourseBaseInfo'],
    data
  }
  return tools.ajax(cfg)
}

//学生端--生成报告  停止课程学习
export const putStudentCreaterReport = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['putStudentCreaterReport'],
    data
  }
  return tools.ajax(cfg)
}

