import { tools } from '@/utils/tools'
import url from './url'

//创建课程计划--基础信息--保存或发布
export const couPlaPlaBasInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['couPlaPlaBasInfo'],
    data
  }
  return tools.ajax(cfg)
}

//创建课程计划--基础信息--获取群组基本信息设置
export const getCouPlaPlaBasInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['getCouPlaPlaBasInfo'],
    data
  }
  return tools.ajax(cfg)
}

// 创作者端 创建课程频道
export const creatorMajorList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['creatorMajorList'],
    data
  }
  return tools.ajax(cfg)
}

// 创作者端 创建课程频道
export const courseListForChannel = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['courseListForChannel'],
    data
  }
  return tools.ajax(cfg)
}

// 创作者端 查看课程频道详情
export const creatorCourseChannelDetail = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['creatorCourseChannelDetail'],
    data
  }
  return tools.ajax(cfg)
}

// 创作者端 发布课程频道
export const saveCourseChannel = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['saveCourseChannel'],
    data
  }
  return tools.ajax(cfg)
}

// 创作者端 创建课程频道  更新数据
export const updateCourseChannel = data => {
  //接口公参添加
  let cfg = {
    method: 'put',
    url: url['updateCourseChannel'],
    data
  }
  return tools.ajax(cfg)
}

//老师端--认证页--获取认证信息
export const memIdeIdeInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memIdeIdeInfo'],
    data
  }
  return tools.ajax(cfg)
}

//添加课程--获取课程列表
export const uniPurAvaCouList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['uniPurAvaCouList'],
    data
  }
  return tools.ajax(cfg)
}

//添加课程--单一标准课--发布 保存
export const couPlaSavForCourse = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['couPlaSavForCourse'],
    data
  }
  return tools.ajax(cfg)
}

//老师端认证--基本信息页--获取老师绑定手机号接口
export const memInfoGetMobile = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['memInfoGetMobile'],
    data
  }
  return tools.ajax(cfg)
}

//老师端认证--基本信息页--绑定手机花提交接口
export const mobCapCheCaptcha = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['mobCapCheCaptcha'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--获取学生课程完成情况接口
export const plaStuStaPlanStuList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['plaStuStaPlanStuList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--群课程计划基本信息
export const groCouPlaCouPlaBasInfo = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groCouPlaCouPlaBasInfo'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--课程频道--成绩区间统计
export const groStaScoreRanges = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaScoreRanges'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--echarts 获取课程成绩排名接口
export const groStaScoSort = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaScoSort'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--echarts 获取反馈语接口
export const groStaFeeBackData = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaFeeBackData'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--echarts 获取各步骤平均分接口
export const groStaQuiScoChaData = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaQuiScoChaData'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--课程频道平均分
export const groStaCouScoChaData = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaCouScoChaData'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--各课程平均分接口
export const groStaCouPlaScoAvg = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaCouPlaScoAvg'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--获取课程计划所有课程接口
export const groStaCouPlaCouList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaCouPlaCouList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--标准课成绩区间统计
export const groStaCouScoRange = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaCouScoRange'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--echarts 获取图表标准课成绩排名
export const groStaCouScoSort = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaCouScoSort'],
    data
  }
  return tools.ajax(cfg)
}

//老师端 群统计分析--标准课平均分
export const groStaCouScoAvg = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaCouScoAvg'],
    data
  }
  return tools.ajax(cfg)
}

//老师端个人中心 获取课程完成情况列表数据
export const groStaGroInfVoList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaGroInfVoList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端个人中心 获取反馈语接口
export const groStaGroFeeBack = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['groStaGroFeeBack'],
    data
  }
  return tools.ajax(cfg)
}

//老师端个人中心 获取基本信息接口
export const getGroStaTeaDetail = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['getGroStaTeaDetail'],
    data
  }
  return tools.ajax(cfg)
}

//老师端认证--信息提交
export const memberIteacherIdentity = data => {
  //接口公参添加
  let cfg = {
    method: 'post',
    url: url['memberIteacherIdentity'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-获取学院可选项
export const getSubMajorList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['getSubMajorList'],
    data
  }
  return tools.ajax(cfg)
}

//老师端-获取大学可选项
export const getUniversityList = data => {
  //接口公参添加
  let cfg = {
    method: 'get',
    url: url['getUniversityList'],
    data
  }
  return tools.ajax(cfg)
}
